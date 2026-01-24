// ==UserScript==
// @name         Edit Banquet Documents
// @namespace    https://www.baileyfurrow.com/
// @version      3.0.0
// @description  Easily edit banquet documents in a simple manner.
// @author       Bailey Furrow
// @match        https://portal.tripleseat.com/doc/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tripleseat.com
// @downloadURL  https://baileyfurrow.github.io/banquet_docs.user.js
// @updateURL    https://baileyfurrow.github.io/banquet_docs.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const doc = document.querySelector("#document_wrap");
    const sidebar = document.querySelector("#document_sidebar");
    const button_class = 'document_options_view';
    var isEdited = false;
    let tipBold = document.createElement('div');
//     tipBold.style.fontStyle = 'italic';
//     tipBold.style.margin = '2rem 20px';
//     tipBold.style.textAlign = 'center';
//     tipBold.style.display = 'none';
    tipBold.className = 'tip';
    tipBold.innerHTML = '<strong>Note</strong>: Changes made on this page will <strong>not</strong> be saved.';
    tipBold.innerHTML += `<br><br><em>Editor version: ${GM_info.script.version}; last modified ${new Date(GM_info.script.lastModified).toDateString()}. Created by ${GM_info.script.author}</em>`;
    document.querySelector('#main').before(tipBold);

    // Basic rich text editor

    function formatSmButton(cmd, btnText, tooltip='') {
        let btn = document.createElement('button');
        btn.className = 'smBtn';
        switch (cmd) {
            case 'bold':
                btn.innerHTML = `<b>${btnText}</b>`;
                break;
            case 'italic':
                btn.innerHTML = `<i>${btnText}</i>`;
                break;
            case 'underline':
                btn.innerHTML = `<u>${btnText}</u>`;
                break;
            default:
                btn.innerHTML = btnText;
        }
        btn.addEventListener('click', function() {
            document.execCommand(cmd, false, null);
            doc.focus();
        });
        btn.title = tooltip;
        return btn;
    }

    let richCtrls = document.createElement('div');
    richCtrls.style.textAlign = 'center';
    richCtrls.style.margin = '10px 0';
    richCtrls.style.position = 'sticky';
    richCtrls.style.top = '0';
    richCtrls.style.backgroundColor = 'white';
    richCtrls.style.zIndex = '100';
    richCtrls.style.padding = '10px 0';
    richCtrls.append(formatSmButton('bold', 'B', 'Bold'));
    richCtrls.append(formatSmButton('italic', 'I', 'Italic'));
    richCtrls.append(formatSmButton('underline', 'U', 'Underline'));
    richCtrls.append(formatSmButton('subscript', '🗛', 'Toggle Small Font'));
    doc.before(richCtrls);
    richCtrls.style.display = 'none';

    function editPage(e) {
        if (!doc.isContentEditable) {
            e.target.textContent = 'Stop Editing...';
            doc.contentEditable = 'true';
            tipBold.style.display = 'block';
            richCtrls.style.display = 'block';
            isEdited = true;
            doc.focus();
        } else {
            e.target.textContent = 'Edit Page';
            doc.contentEditable = 'false';
            tipBold.style.display = 'none';
            richCtrls.style.display = 'none';
        }
    }
    function printPage(e) {
        if (doc.isContentEditable) {
            btnEditPage.firstElementChild.click();
        }
        window.print();
    }
    function getHelp() {
        let txtHelp = `
            <h2>About new editing tool</h2>

            This is a tool created by Bailey Furrow to address some shortcomings of the Tripleseat system.<br>
            The tool allows you to edit documents to be printed to correct formatting mistakes.
            <h2>How to use tool</h2>
            To use this tool, simply click "Edit Page" to begin editing the document to be printed.<br>
            As of version 2.0, this editor includes buttons for basic formatting: <b>bold</b>, <i>italics</i>, and <u>underline</u>.<br><br>
            <sub><i>A button is also available to make text smaller.</i></sub><br><br>
            Once finished editing, just click the "Print Page" button. The code I wrote will take care of printing the correct parts of the page.<br>
            <h2>Version 3.0</h2>
            Version 3.0 added the ability to move menu cards to the left to accomodate the new printer. Two additional
            buttons have been added for this purpose.
            <h4>Note</h4>
            Anything typed on the page will NOT be saved. That requires a LOT more work that I don't wanna do, plus it's unecessary.<br>
            <div style="text-align: center; font-style: italic;">Edtior version: ${GM_info.script.version}</div><br>
            <button style="display: flex; align-items: center; margin: 5px auto" onClick="window.close()">Close</button>
        `;
        const helpWindow = window.open('','','height=450,width=600,menubar=no,status=no');
        helpWindow.document.body.innerHTML = txtHelp;
        helpWindow.document.body.style.lineHeight = "1.2";
        helpWindow.document.body.style.margin = "8px";
        helpWindow.document.title = "About new editing tool";
        let helpStyle = helpWindow.document.createElement('link');
        helpStyle.rel = 'stylesheet';
        helpStyle.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
        helpWindow.document.head.append(helpStyle);
    }

    let menuStyle = `
        #document_wrap {
            width: 4.5in;
            min-height: initial;
            max-height: 7.5in;
            margin: 0;
            overflow: clip;
        }
        @media screen {
            #document_wrap {
                border: 1px solid black;
            }
        }
    `;

    function menuLayout(e, forceLayoutOn = false, forceOff = false) {
        if (!document.querySelector('#menuStyle') && !forceOff) {
            let menuLayoutStylesheet = document.createElement('style');
            menuLayoutStylesheet.textContent = menuStyle;
            menuLayoutStylesheet.id = 'menuStyle';
            document.head.appendChild(menuLayoutStylesheet);
        } else if (document.querySelector('#menuStyle') && !forceLayoutOn) {
            document.querySelector('#menuStyle').remove();
        }
    }

    // Shift everything to the left if printing as a menu card.
    function printMenu() {
        if (doc.isContentEditable) {
            btnEditPage.firstElementChild.click();
        }
        if (!document.querySelector('#menuPrintStyle')) {
            let menuPrintStyle = `@media print { ${menuStyle} } `;
            let menuStylesheet = document.createElement('style');
            menuStylesheet.textContent = menuPrintStyle;
            menuStylesheet.id = 'menuPrintStyle';
            document.head.appendChild(menuStylesheet);
        }
        menuLayout(null, true);
        let cont = true;
        // 720 == 7.5in;
        if (doc.scrollHeight > 720) {
            cont = window.confirm('Contents of menu goes beyond the boundaries of a menu card. Do you wish to continue?');
        }
        if (cont) {
            window.print();
        }
    }
    let style = `
        @media print {
            .logo_image, .tip {
                display: none;
            }
        }
        .print_or_sign, .pagebreak, .pagebreak_border {
            display: none !important;
        }
        .tip {
            fontStyle: italic;
            margin: 2rem 20px;
            text-align: center;
            display: none;
        .smBtn {
            font-size: 12pt;
            margin: 5px;
            padding: 2px;
            width: 25px;
            height: 25px;
            display: block;
            font-family: "Times New Roman", serif;
        }
    `;
    let stylesheet = document.createElement('style');
    stylesheet.textContent = style;
    document.head.appendChild(stylesheet);

    function addButton(text, callback) {
        let btn = document.createElement('div');
        btn.className = button_class;

        let btnLink = document.createElement('a');
        btnLink.textContent = text;
        btnLink.href = '#';
        btnLink.addEventListener('click', callback);
        btn.append(btnLink);
        return btn;
    }

    let btnEditPage = addButton('Edit Page', editPage);
    let btnPrintPage = addButton('Print Page', printPage);
    let btnMenuLayout = addButton('Menu Card Preview Layout', menuLayout);
    let btnPrintMenu = addButton('Print Menu Card', printMenu);
    let btnHelp = addButton('Help/About Editing', getHelp);

    sidebar.firstChild.before(btnHelp);
    sidebar.firstChild.before(btnPrintMenu);
    sidebar.firstChild.before(btnMenuLayout);
    sidebar.firstChild.before(btnPrintPage);
    sidebar.firstChild.before(btnEditPage);

    // Check before unload.
    window.addEventListener('beforeunload', function (e) {
        if (isEdited) {
            e.preventDefault();
        }
    });

})();