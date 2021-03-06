/* ***** BEGIN LICENSE BLOCK *****
 *   Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 * 
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Files By Email Helper.
 *
 * The Initial Developer of the Original Code is
 * Igor Tarasov.
 * Portions created by the Initial Developer are Copyright (C) 2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 * 
 * ***** END LICENSE BLOCK ***** */

var fbe = {
    onLoad: function() {
        // initialization code
        this.initialized = true;
        this.strings = document.getElementById("fbe-strings");
        document.getElementById("contentAreaContextMenu")
            .addEventListener("popupshowing", function(e) { fbe.showContextMenu(e); }, false);
    },

    showContextMenu: function(event) {
        // show or hide the menuitem based on what the context menu is on
        // see http://kb.mozillazine.org/Adding_items_to_menus
        document.getElementById("context-fbe-getlink").hidden = !gContextMenu.onLink;
    },

    onMenuItemCommand: function() {
        var anAnchor	= gContextMenu.linkURL;
        var doc = gContextMenu.target.ownerDocument;

        if (anAnchor.substr(0, 7).toLowerCase() == "http://"
        	|| anAnchor.substr(0, 6).toLowerCase() == "ftp://") {
        	var
        		sUrl		= "http://www.tcompressor.ru/Files-by-Email/?File=" + fbe.escapeString(anAnchor)
        			+ "&Referer=" + fbe.escapeString(doc.URL)
        			+ (doc.cookie != null && fbe.areUrlDomainsSame(anAnchor, doc.URL)
        				? "&Cookie=" + fbe.escapeString(doc.cookie)
        				: "");

        var newTab = gBrowser.addTab(sUrl);
        gBrowser.selectedTab = newTab;
        } else window.alert(document.getElementById("fbe-strings").getString("error.http-and-ftp-only"));
    },

    areUrlDomainsSame: function(sUrl1, sUrl2) {
		var
			arDomains1 = fbe.getUrlDomainList(sUrl1),
			arDomains2 = fbe.getUrlDomainList(sUrl2);

		return arDomains1.length >= 3 && arDomains2.length >= 3
			&& arDomains1[arDomains1.length - 1] == arDomains2[arDomains2.length - 1]
			&& arDomains1[arDomains1.length - 2] == arDomains2[arDomains2.length - 2]
			&& arDomains1[arDomains1.length - 3] == arDomains2[arDomains2.length - 3];
	},

	getUrlDomainList: function(sUrl) {
		return fbe.getUrlFullDomain(sUrl).split('.');
	},

	getUrlFullDomain: function(sUrl) {
		return sUrl.split('/')[2];
	},

	escapeString: function(s) {
		s = escape(s);
		while (s.indexOf("+") != -1)
			s = s.replace("+", "%2B");
		return s;
	}
};
window.addEventListener("load", function(e) { fbe.onLoad(e); }, false);