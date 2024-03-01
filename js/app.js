(() => {
    "use strict";
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
    };
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    class Popup {
        constructor(options) {
            let config = {
                logging: true,
                init: true,
                attributeOpenButton: "data-popup",
                attributeCloseButton: "data-close",
                fixElementSelector: "[data-lp]",
                youtubeAttribute: "data-popup-youtube",
                youtubePlaceAttribute: "data-popup-youtube-place",
                setAutoplayYoutube: true,
                classes: {
                    popup: "popup",
                    popupContent: "popup__content",
                    popupActive: "popup_show",
                    bodyActive: "popup-show"
                },
                focusCatch: true,
                closeEsc: true,
                bodyLock: true,
                hashSettings: {
                    location: true,
                    goHash: true
                },
                on: {
                    beforeOpen: function() {},
                    afterOpen: function() {},
                    beforeClose: function() {},
                    afterClose: function() {}
                }
            };
            this.youTubeCode;
            this.isOpen = false;
            this.targetOpen = {
                selector: false,
                element: false
            };
            this.previousOpen = {
                selector: false,
                element: false
            };
            this.lastClosed = {
                selector: false,
                element: false
            };
            this._dataValue = false;
            this.hash = false;
            this._reopen = false;
            this._selectorOpen = false;
            this.lastFocusEl = false;
            this._focusEl = [ "a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])' ];
            this.options = {
                ...config,
                ...options,
                classes: {
                    ...config.classes,
                    ...options?.classes
                },
                hashSettings: {
                    ...config.hashSettings,
                    ...options?.hashSettings
                },
                on: {
                    ...config.on,
                    ...options?.on
                }
            };
            this.bodyLock = false;
            this.options.init ? this.initPopups() : null;
        }
        initPopups() {
            this.popupLogging(`Прокинувся`);
            this.eventsPopup();
        }
        eventsPopup() {
            document.addEventListener("click", function(e) {
                const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
                if (buttonOpen) {
                    e.preventDefault();
                    this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
                    this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
                    if (this._dataValue !== "error") {
                        if (!this.isOpen) this.lastFocusEl = buttonOpen;
                        this.targetOpen.selector = `${this._dataValue}`;
                        this._selectorOpen = true;
                        this.open();
                        return;
                    } else this.popupLogging(`Йой, не заповнено атрибут у ${buttonOpen.classList}`);
                    return;
                }
                const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
                if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
            }.bind(this));
            document.addEventListener("keydown", function(e) {
                if (this.options.closeEsc && e.which == 27 && e.code === "Escape" && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
                if (this.options.focusCatch && e.which == 9 && this.isOpen) {
                    this._focusCatch(e);
                    return;
                }
            }.bind(this));
            if (this.options.hashSettings.goHash) {
                window.addEventListener("hashchange", function() {
                    if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
                }.bind(this));
                window.addEventListener("load", function() {
                    if (window.location.hash) this._openToHash();
                }.bind(this));
            }
        }
        open(selectorValue) {
            if (bodyLockStatus) {
                this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
                if (selectorValue && typeof selectorValue === "string" && selectorValue.trim() !== "") {
                    this.targetOpen.selector = selectorValue;
                    this._selectorOpen = true;
                }
                if (this.isOpen) {
                    this._reopen = true;
                    this.close();
                }
                if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
                if (!this._reopen) this.previousActiveElement = document.activeElement;
                this.targetOpen.element = document.querySelector(this.targetOpen.selector);
                if (this.targetOpen.element) {
                    if (this.youTubeCode) {
                        const codeVideo = this.youTubeCode;
                        const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
                        const iframe = document.createElement("iframe");
                        iframe.setAttribute("allowfullscreen", "");
                        const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
                        iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
                        iframe.setAttribute("src", urlVideo);
                        if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
                            this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
                        }
                        this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
                    }
                    if (this.options.hashSettings.location) {
                        this._getHash();
                        this._setHash();
                    }
                    this.options.on.beforeOpen(this);
                    document.dispatchEvent(new CustomEvent("beforePopupOpen", {
                        detail: {
                            popup: this
                        }
                    }));
                    this.targetOpen.element.classList.add(this.options.classes.popupActive);
                    document.documentElement.classList.add(this.options.classes.bodyActive);
                    if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
                    this.targetOpen.element.setAttribute("aria-hidden", "false");
                    this.previousOpen.selector = this.targetOpen.selector;
                    this.previousOpen.element = this.targetOpen.element;
                    this._selectorOpen = false;
                    this.isOpen = true;
                    setTimeout((() => {
                        this._focusTrap();
                    }), 50);
                    this.options.on.afterOpen(this);
                    document.dispatchEvent(new CustomEvent("afterPopupOpen", {
                        detail: {
                            popup: this
                        }
                    }));
                    this.popupLogging(`Відкрив попап`);
                } else this.popupLogging(`Йой, такого попапу немає. Перевірте коректність введення. `);
            }
        }
        close(selectorValue) {
            if (selectorValue && typeof selectorValue === "string" && selectorValue.trim() !== "") this.previousOpen.selector = selectorValue;
            if (!this.isOpen || !bodyLockStatus) return;
            this.options.on.beforeClose(this);
            document.dispatchEvent(new CustomEvent("beforePopupClose", {
                detail: {
                    popup: this
                }
            }));
            if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
            this.previousOpen.element.classList.remove(this.options.classes.popupActive);
            this.previousOpen.element.setAttribute("aria-hidden", "true");
            if (!this._reopen) {
                document.documentElement.classList.remove(this.options.classes.bodyActive);
                !this.bodyLock ? bodyUnlock() : null;
                this.isOpen = false;
            }
            this._removeHash();
            if (this._selectorOpen) {
                this.lastClosed.selector = this.previousOpen.selector;
                this.lastClosed.element = this.previousOpen.element;
            }
            this.options.on.afterClose(this);
            document.dispatchEvent(new CustomEvent("afterPopupClose", {
                detail: {
                    popup: this
                }
            }));
            setTimeout((() => {
                this._focusTrap();
            }), 50);
            this.popupLogging(`Закрив попап`);
        }
        _getHash() {
            if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
        }
        _openToHash() {
            let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
            const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
            this.youTubeCode = buttons.getAttribute(this.options.youtubeAttribute) ? buttons.getAttribute(this.options.youtubeAttribute) : null;
            if (buttons && classInHash) this.open(classInHash);
        }
        _setHash() {
            history.pushState("", "", this.hash);
        }
        _removeHash() {
            history.pushState("", "", window.location.href.split("#")[0]);
        }
        _focusCatch(e) {
            const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
            const focusArray = Array.prototype.slice.call(focusable);
            const focusedIndex = focusArray.indexOf(document.activeElement);
            if (e.shiftKey && focusedIndex === 0) {
                focusArray[focusArray.length - 1].focus();
                e.preventDefault();
            }
            if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                focusArray[0].focus();
                e.preventDefault();
            }
        }
        _focusTrap() {
            const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
            if (!this.isOpen && this.lastFocusEl) this.lastFocusEl.focus(); else focusable[0].focus();
        }
        popupLogging(message) {
            this.options.logging ? functions_FLS(`[Попапос]: ${message}`) : null;
        }
    }
    modules_flsModules.popup = new Popup({});
    let formValidate = {
        getErrors(form) {
            let error = 0;
            let formRequiredItems = form.querySelectorAll("*[data-required]");
            if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
            }));
            return error;
        },
        validateInput(formRequiredItem) {
            let error = 0;
            if (formRequiredItem.dataset.required === "email") {
                formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                if (this.emailTest(formRequiredItem)) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
            } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
                this.addError(formRequiredItem);
                error++;
            } else if (!formRequiredItem.value.trim()) {
                this.addError(formRequiredItem);
                error++;
            } else this.removeError(formRequiredItem);
            return error;
        },
        addError(formRequiredItem) {
            formRequiredItem.classList.add("_form-error");
            formRequiredItem.parentElement.classList.add("_form-error");
            let inputError = formRequiredItem.parentElement.querySelector(".form__error");
            if (inputError) formRequiredItem.parentElement.removeChild(inputError);
            if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
        },
        removeError(formRequiredItem) {
            formRequiredItem.classList.remove("_form-error");
            formRequiredItem.parentElement.classList.remove("_form-error");
            if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
        },
        formClean(form) {
            form.reset();
            setTimeout((() => {
                let inputs = form.querySelectorAll("input,textarea");
                for (let index = 0; index < inputs.length; index++) {
                    const el = inputs[index];
                    el.parentElement.classList.remove("_form-focus");
                    el.classList.remove("_form-focus");
                    formValidate.removeError(el);
                }
                let checkboxes = form.querySelectorAll(".checkbox__input");
                if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                    const checkbox = checkboxes[index];
                    checkbox.checked = false;
                }
                if (modules_flsModules.select) {
                    let selects = form.querySelectorAll(".select");
                    if (selects.length) for (let index = 0; index < selects.length; index++) {
                        const select = selects[index].querySelector("select");
                        modules_flsModules.select.selectBuild(select);
                    }
                }
            }), 0);
        },
        emailTest(formRequiredItem) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
        }
    };
    class SelectConstructor {
        constructor(props, data = null) {
            let defaultConfig = {
                init: true,
                logging: true
            };
            this.config = Object.assign(defaultConfig, props);
            this.selectClasses = {
                classSelect: "select",
                classSelectBody: "select__body",
                classSelectTitle: "select__title",
                classSelectValue: "select__value",
                classSelectLabel: "select__label",
                classSelectInput: "select__input",
                classSelectText: "select__text",
                classSelectLink: "select__link",
                classSelectOptions: "select__options",
                classSelectOptionsScroll: "select__scroll",
                classSelectOption: "select__option",
                classSelectContent: "select__content",
                classSelectRow: "select__row",
                classSelectData: "select__asset",
                classSelectDisabled: "_select-disabled",
                classSelectTag: "_select-tag",
                classSelectOpen: "_select-open",
                classSelectActive: "_select-active",
                classSelectFocus: "_select-focus",
                classSelectMultiple: "_select-multiple",
                classSelectCheckBox: "_select-checkbox",
                classSelectOptionSelected: "_select-selected",
                classSelectPseudoLabel: "_select-pseudo-label"
            };
            this._this = this;
            if (this.config.init) {
                const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll("select");
                if (selectItems.length) {
                    this.selectsInit(selectItems);
                    this.setLogging(`Прокинувся, построїв селектов: (${selectItems.length})`);
                } else this.setLogging("Сплю, немає жодного select zzZZZzZZz");
            }
        }
        getSelectClass(className) {
            return `.${className}`;
        }
        getSelectElement(selectItem, className) {
            return {
                originalSelect: selectItem.querySelector("select"),
                selectElement: selectItem.querySelector(this.getSelectClass(className))
            };
        }
        selectsInit(selectItems) {
            selectItems.forEach(((originalSelect, index) => {
                this.selectInit(originalSelect, index + 1);
            }));
            document.addEventListener("click", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("keydown", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("focusin", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("focusout", function(e) {
                this.selectsActions(e);
            }.bind(this));
        }
        selectInit(originalSelect, index) {
            const _this = this;
            let selectItem = document.createElement("div");
            selectItem.classList.add(this.selectClasses.classSelect);
            originalSelect.parentNode.insertBefore(selectItem, originalSelect);
            selectItem.appendChild(originalSelect);
            originalSelect.hidden = true;
            index ? originalSelect.dataset.id = index : null;
            if (this.getSelectPlaceholder(originalSelect)) {
                originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
                if (this.getSelectPlaceholder(originalSelect).label.show) {
                    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
                    selectItemTitle.insertAdjacentHTML("afterbegin", `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
                }
            }
            selectItem.insertAdjacentHTML("beforeend", `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
            this.selectBuild(originalSelect);
            originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : "150";
            originalSelect.addEventListener("change", (function(e) {
                _this.selectChange(e);
            }));
        }
        selectBuild(originalSelect) {
            const selectItem = originalSelect.parentElement;
            selectItem.dataset.id = originalSelect.dataset.id;
            originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;
            originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
            originalSelect.hasAttribute("data-checkbox") && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
            this.setSelectTitleValue(selectItem, originalSelect);
            this.setOptions(selectItem, originalSelect);
            originalSelect.hasAttribute("data-search") ? this.searchActions(selectItem) : null;
            originalSelect.hasAttribute("data-open") ? this.selectAction(selectItem) : null;
            this.selectDisabled(selectItem, originalSelect);
        }
        selectsActions(e) {
            const targetElement = e.target;
            const targetType = e.type;
            if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                const selectItem = targetElement.closest(".select") ? targetElement.closest(".select") : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
                const originalSelect = this.getSelectElement(selectItem).originalSelect;
                if (targetType === "click") {
                    if (!originalSelect.disabled) if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                        const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
                        const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
                        this.optionAction(selectItem, originalSelect, optionItem);
                    } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) this.selectAction(selectItem); else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
                        const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
                        this.optionAction(selectItem, originalSelect, optionItem);
                    }
                } else if (targetType === "focusin" || targetType === "focusout") {
                    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) targetType === "focusin" ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
                } else if (targetType === "keydown" && e.code === "Escape") this.selectsСlose();
            } else this.selectsСlose();
        }
        selectsСlose(selectOneGroup) {
            const selectsGroup = selectOneGroup ? selectOneGroup : document;
            const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
            if (selectActiveItems.length) selectActiveItems.forEach((selectActiveItem => {
                this.selectСlose(selectActiveItem);
            }));
        }
        selectСlose(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            if (!selectOptions.classList.contains("_slide")) {
                selectItem.classList.remove(this.selectClasses.classSelectOpen);
                _slideUp(selectOptions, originalSelect.dataset.speed);
            }
        }
        selectAction(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            if (originalSelect.closest("[data-one-select]")) {
                const selectOneGroup = originalSelect.closest("[data-one-select]");
                this.selectsСlose(selectOneGroup);
            }
            if (!selectOptions.classList.contains("_slide")) {
                selectItem.classList.toggle(this.selectClasses.classSelectOpen);
                _slideToggle(selectOptions, originalSelect.dataset.speed);
            }
        }
        setSelectTitleValue(selectItem, originalSelect) {
            const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
            const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
            if (selectItemTitle) selectItemTitle.remove();
            selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
        }
        getSelectTitleValue(selectItem, originalSelect) {
            let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
            if (originalSelect.multiple && originalSelect.hasAttribute("data-tags")) {
                selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map((option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`)).join("");
                if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
                    document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
                    if (originalSelect.hasAttribute("data-search")) selectTitleValue = false;
                }
            }
            selectTitleValue = selectTitleValue.length ? selectTitleValue : originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : "";
            let pseudoAttribute = "";
            let pseudoAttributeClass = "";
            if (originalSelect.hasAttribute("data-pseudo-label")) {
                pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заповніть атрибут"`;
                pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
            }
            this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
            if (originalSelect.hasAttribute("data-search")) return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`; else {
                const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : "";
                return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
            }
        }
        getSelectElementContent(selectOption) {
            const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : "";
            const selectOptionDataHTML = selectOptionData.indexOf("img") >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
            let selectOptionContentHTML = ``;
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : "";
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : "";
            selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : "";
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : "";
            selectOptionContentHTML += selectOption.textContent;
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            return selectOptionContentHTML;
        }
        getSelectPlaceholder(originalSelect) {
            const selectPlaceholder = Array.from(originalSelect.options).find((option => !option.value));
            if (selectPlaceholder) return {
                value: selectPlaceholder.textContent,
                show: selectPlaceholder.hasAttribute("data-show"),
                label: {
                    show: selectPlaceholder.hasAttribute("data-label"),
                    text: selectPlaceholder.dataset.label
                }
            };
        }
        getSelectedOptionsData(originalSelect, type) {
            let selectedOptions = [];
            if (originalSelect.multiple) selectedOptions = Array.from(originalSelect.options).filter((option => option.value)).filter((option => option.selected)); else selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
            return {
                elements: selectedOptions.map((option => option)),
                values: selectedOptions.filter((option => option.value)).map((option => option.value)),
                html: selectedOptions.map((option => this.getSelectElementContent(option)))
            };
        }
        getOptions(originalSelect) {
            let selectOptionsScroll = originalSelect.hasAttribute("data-scroll") ? `data-simplebar` : "";
            let selectOptionsScrollHeight = originalSelect.dataset.scroll ? `style="max-height:${originalSelect.dataset.scroll}px"` : "";
            let selectOptions = Array.from(originalSelect.options);
            if (selectOptions.length > 0) {
                let selectOptionsHTML = ``;
                if (this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show || originalSelect.multiple) selectOptions = selectOptions.filter((option => option.value));
                selectOptionsHTML += selectOptionsScroll ? `<div ${selectOptionsScroll} ${selectOptionsScrollHeight} class="${this.selectClasses.classSelectOptionsScroll}">` : "";
                selectOptions.forEach((selectOption => {
                    selectOptionsHTML += this.getOption(selectOption, originalSelect);
                }));
                selectOptionsHTML += selectOptionsScroll ? `</div>` : "";
                return selectOptionsHTML;
            }
        }
        getOption(selectOption, originalSelect) {
            const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : "";
            const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute("data-show-selected") && !originalSelect.multiple ? `hidden` : ``;
            const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : "";
            const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
            const selectOptionLinkTarget = selectOption.hasAttribute("data-href-blank") ? `target="_blank"` : "";
            let selectOptionHTML = ``;
            selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
            selectOptionHTML += this.getSelectElementContent(selectOption);
            selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
            return selectOptionHTML;
        }
        setOptions(selectItem, originalSelect) {
            const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            selectItemOptions.innerHTML = this.getOptions(originalSelect);
        }
        optionAction(selectItem, originalSelect, optionItem) {
            if (originalSelect.multiple) {
                optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
                const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
                originalSelectSelectedItems.forEach((originalSelectSelectedItem => {
                    originalSelectSelectedItem.removeAttribute("selected");
                }));
                const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
                selectSelectedItems.forEach((selectSelectedItems => {
                    originalSelect.querySelector(`option[value="${selectSelectedItems.dataset.value}"]`).setAttribute("selected", "selected");
                }));
            } else {
                if (!originalSelect.hasAttribute("data-show-selected")) {
                    if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
                    optionItem.hidden = true;
                }
                originalSelect.value = optionItem.hasAttribute("data-value") ? optionItem.dataset.value : optionItem.textContent;
                this.selectAction(selectItem);
            }
            this.setSelectTitleValue(selectItem, originalSelect);
            this.setSelectChange(originalSelect);
        }
        selectChange(e) {
            const originalSelect = e.target;
            this.selectBuild(originalSelect);
            this.setSelectChange(originalSelect);
        }
        setSelectChange(originalSelect) {
            if (originalSelect.hasAttribute("data-validate")) formValidate.validateInput(originalSelect);
            if (originalSelect.hasAttribute("data-submit") && originalSelect.value) {
                let tempButton = document.createElement("button");
                tempButton.type = "submit";
                originalSelect.closest("form").append(tempButton);
                tempButton.click();
                tempButton.remove();
            }
            const selectItem = originalSelect.parentElement;
            this.selectCallback(selectItem, originalSelect);
        }
        selectDisabled(selectItem, originalSelect) {
            if (originalSelect.disabled) {
                selectItem.classList.add(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
            } else {
                selectItem.classList.remove(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
            }
        }
        searchActions(selectItem) {
            this.getSelectElement(selectItem).originalSelect;
            const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption}`);
            const _this = this;
            selectInput.addEventListener("input", (function() {
                selectOptionsItems.forEach((selectOptionsItem => {
                    if (selectOptionsItem.textContent.toUpperCase().indexOf(selectInput.value.toUpperCase()) >= 0) selectOptionsItem.hidden = false; else selectOptionsItem.hidden = true;
                }));
                selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
            }));
        }
        selectCallback(selectItem, originalSelect) {
            document.dispatchEvent(new CustomEvent("selectCallback", {
                detail: {
                    select: originalSelect
                }
            }));
        }
        setLogging(message) {
            this.config.logging ? functions_FLS(`[select]: ${message}`) : null;
        }
    }
    modules_flsModules.select = new SelectConstructor({});
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    !function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define([ "exports" ], e) : e((t = "undefined" != typeof globalThis ? globalThis : t || self).noUiSlider = {});
    }(void 0, (function(ot) {
        "use strict";
        function n(t) {
            return "object" == typeof t && "function" == typeof t.to;
        }
        function st(t) {
            t.parentElement.removeChild(t);
        }
        function at(t) {
            return null != t;
        }
        function lt(t) {
            t.preventDefault();
        }
        function i(t) {
            return "number" == typeof t && !isNaN(t) && isFinite(t);
        }
        function ut(t, e, r) {
            0 < r && (ft(t, e), setTimeout((function() {
                dt(t, e);
            }), r));
        }
        function ct(t) {
            return Math.max(Math.min(t, 100), 0);
        }
        function pt(t) {
            return Array.isArray(t) ? t : [ t ];
        }
        function e(t) {
            t = (t = String(t)).split(".");
            return 1 < t.length ? t[1].length : 0;
        }
        function ft(t, e) {
            t.classList && !/\s/.test(e) ? t.classList.add(e) : t.className += " " + e;
        }
        function dt(t, e) {
            t.classList && !/\s/.test(e) ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ");
        }
        function ht(t) {
            var e = void 0 !== window.pageXOffset, r = "CSS1Compat" === (t.compatMode || "");
            return {
                x: e ? window.pageXOffset : (r ? t.documentElement : t.body).scrollLeft,
                y: e ? window.pageYOffset : (r ? t.documentElement : t.body).scrollTop
            };
        }
        function s(t, e) {
            return 100 / (e - t);
        }
        function a(t, e, r) {
            return 100 * e / (t[r + 1] - t[r]);
        }
        function l(t, e) {
            for (var r = 1; t >= e[r]; ) r += 1;
            return r;
        }
        function r(t, e, r) {
            if (r >= t.slice(-1)[0]) return 100;
            var n = l(r, t), i = t[n - 1], o = t[n];
            t = e[n - 1], n = e[n];
            return t + (r, a(o = [ i, o ], o[0] < 0 ? r + Math.abs(o[0]) : r - o[0], 0) / s(t, n));
        }
        function o(t, e, r, n) {
            if (100 === n) return n;
            var i = l(n, t), o = t[i - 1], s = t[i];
            return r ? (s - o) / 2 < n - o ? s : o : e[i - 1] ? t[i - 1] + (t = n - t[i - 1], 
            i = e[i - 1], Math.round(t / i) * i) : n;
        }
        ot.PipsMode = void 0, (H = ot.PipsMode || (ot.PipsMode = {})).Range = "range", H.Steps = "steps", 
        H.Positions = "positions", H.Count = "count", H.Values = "values", ot.PipsType = void 0, 
        (H = ot.PipsType || (ot.PipsType = {}))[H.None = -1] = "None", H[H.NoValue = 0] = "NoValue", 
        H[H.LargeValue = 1] = "LargeValue", H[H.SmallValue = 2] = "SmallValue";
        var u = (t.prototype.getDistance = function(t) {
            for (var e = [], r = 0; r < this.xNumSteps.length - 1; r++) e[r] = a(this.xVal, t, r);
            return e;
        }, t.prototype.getAbsoluteDistance = function(t, e, r) {
            var n = 0;
            if (t < this.xPct[this.xPct.length - 1]) for (;t > this.xPct[n + 1]; ) n++; else t === this.xPct[this.xPct.length - 1] && (n = this.xPct.length - 2);
            r || t !== this.xPct[n + 1] || n++;
            for (var i, o = 1, s = (e = null === e ? [] : e)[n], a = 0, l = 0, u = 0, c = r ? (t - this.xPct[n]) / (this.xPct[n + 1] - this.xPct[n]) : (this.xPct[n + 1] - t) / (this.xPct[n + 1] - this.xPct[n]); 0 < s; ) i = this.xPct[n + 1 + u] - this.xPct[n + u], 
            100 < e[n + u] * o + 100 - 100 * c ? (a = i * c, o = (s - 100 * c) / e[n + u], c = 1) : (a = e[n + u] * i / 100 * o, 
            o = 0), r ? (l -= a, 1 <= this.xPct.length + u && u--) : (l += a, 1 <= this.xPct.length - u && u++), 
            s = e[n + u] * o;
            return t + l;
        }, t.prototype.toStepping = function(t) {
            return t = r(this.xVal, this.xPct, t);
        }, t.prototype.fromStepping = function(t) {
            return function(t, e, r) {
                if (100 <= r) return t.slice(-1)[0];
                var n = l(r, e), i = t[n - 1], o = t[n];
                t = e[n - 1], n = e[n];
                return (r - t) * s(t, n) * ((o = [ i, o ])[1] - o[0]) / 100 + o[0];
            }(this.xVal, this.xPct, t);
        }, t.prototype.getStep = function(t) {
            return t = o(this.xPct, this.xSteps, this.snap, t);
        }, t.prototype.getDefaultStep = function(t, e, r) {
            var n = l(t, this.xPct);
            return (100 === t || e && t === this.xPct[n - 1]) && (n = Math.max(n - 1, 1)), (this.xVal[n] - this.xVal[n - 1]) / r;
        }, t.prototype.getNearbySteps = function(t) {
            t = l(t, this.xPct);
            return {
                stepBefore: {
                    startValue: this.xVal[t - 2],
                    step: this.xNumSteps[t - 2],
                    highestStep: this.xHighestCompleteStep[t - 2]
                },
                thisStep: {
                    startValue: this.xVal[t - 1],
                    step: this.xNumSteps[t - 1],
                    highestStep: this.xHighestCompleteStep[t - 1]
                },
                stepAfter: {
                    startValue: this.xVal[t],
                    step: this.xNumSteps[t],
                    highestStep: this.xHighestCompleteStep[t]
                }
            };
        }, t.prototype.countStepDecimals = function() {
            var t = this.xNumSteps.map(e);
            return Math.max.apply(null, t);
        }, t.prototype.hasNoSize = function() {
            return this.xVal[0] === this.xVal[this.xVal.length - 1];
        }, t.prototype.convert = function(t) {
            return this.getStep(this.toStepping(t));
        }, t.prototype.handleEntryPoint = function(t, e) {
            t = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t);
            if (!i(t) || !i(e[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
            this.xPct.push(t), this.xVal.push(e[0]);
            e = Number(e[1]);
            t ? this.xSteps.push(!isNaN(e) && e) : isNaN(e) || (this.xSteps[0] = e), this.xHighestCompleteStep.push(0);
        }, t.prototype.handleStepPoint = function(t, e) {
            e && (this.xVal[t] !== this.xVal[t + 1] ? (this.xSteps[t] = a([ this.xVal[t], this.xVal[t + 1] ], e, 0) / s(this.xPct[t], this.xPct[t + 1]), 
            e = (this.xVal[t + 1] - this.xVal[t]) / this.xNumSteps[t], e = Math.ceil(Number(e.toFixed(3)) - 1), 
            e = this.xVal[t] + this.xNumSteps[t] * e, this.xHighestCompleteStep[t] = e) : this.xSteps[t] = this.xHighestCompleteStep[t] = this.xVal[t]);
        }, t);
        function t(e, t, r) {
            var n;
            this.xPct = [], this.xVal = [], this.xSteps = [], this.xNumSteps = [], this.xHighestCompleteStep = [], 
            this.xSteps = [ r || !1 ], this.xNumSteps = [ !1 ], this.snap = t;
            var i = [];
            for (Object.keys(e).forEach((function(t) {
                i.push([ pt(e[t]), t ]);
            })), i.sort((function(t, e) {
                return t[0][0] - e[0][0];
            })), n = 0; n < i.length; n++) this.handleEntryPoint(i[n][1], i[n][0]);
            for (this.xNumSteps = this.xSteps.slice(0), n = 0; n < this.xNumSteps.length; n++) this.handleStepPoint(n, this.xNumSteps[n]);
        }
        var c = {
            to: function(t) {
                return void 0 === t ? "" : t.toFixed(2);
            },
            from: Number
        }, p = {
            target: "target",
            base: "base",
            origin: "origin",
            handle: "handle",
            handleLower: "handle-lower",
            handleUpper: "handle-upper",
            touchArea: "touch-area",
            horizontal: "horizontal",
            vertical: "vertical",
            background: "background",
            connect: "connect",
            connects: "connects",
            ltr: "ltr",
            rtl: "rtl",
            textDirectionLtr: "txt-dir-ltr",
            textDirectionRtl: "txt-dir-rtl",
            draggable: "draggable",
            drag: "state-drag",
            tap: "state-tap",
            active: "active",
            tooltip: "tooltip",
            pips: "pips",
            pipsHorizontal: "pips-horizontal",
            pipsVertical: "pips-vertical",
            marker: "marker",
            markerHorizontal: "marker-horizontal",
            markerVertical: "marker-vertical",
            markerNormal: "marker-normal",
            markerLarge: "marker-large",
            markerSub: "marker-sub",
            value: "value",
            valueHorizontal: "value-horizontal",
            valueVertical: "value-vertical",
            valueNormal: "value-normal",
            valueLarge: "value-large",
            valueSub: "value-sub"
        }, mt = {
            tooltips: ".__tooltips",
            aria: ".__aria"
        };
        function f(t, e) {
            if (!i(e)) throw new Error("noUiSlider: 'step' is not numeric.");
            t.singleStep = e;
        }
        function d(t, e) {
            if (!i(e)) throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
            t.keyboardPageMultiplier = e;
        }
        function h(t, e) {
            if (!i(e)) throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
            t.keyboardMultiplier = e;
        }
        function m(t, e) {
            if (!i(e)) throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
            t.keyboardDefaultStep = e;
        }
        function g(t, e) {
            if ("object" != typeof e || Array.isArray(e)) throw new Error("noUiSlider: 'range' is not an object.");
            if (void 0 === e.min || void 0 === e.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
            t.spectrum = new u(e, t.snap || !1, t.singleStep);
        }
        function v(t, e) {
            if (e = pt(e), !Array.isArray(e) || !e.length) throw new Error("noUiSlider: 'start' option is incorrect.");
            t.handles = e.length, t.start = e;
        }
        function b(t, e) {
            if ("boolean" != typeof e) throw new Error("noUiSlider: 'snap' option must be a boolean.");
            t.snap = e;
        }
        function S(t, e) {
            if ("boolean" != typeof e) throw new Error("noUiSlider: 'animate' option must be a boolean.");
            t.animate = e;
        }
        function x(t, e) {
            if ("number" != typeof e) throw new Error("noUiSlider: 'animationDuration' option must be a number.");
            t.animationDuration = e;
        }
        function y(t, e) {
            var r, n = [ !1 ];
            if ("lower" === e ? e = [ !0, !1 ] : "upper" === e && (e = [ !1, !0 ]), !0 === e || !1 === e) {
                for (r = 1; r < t.handles; r++) n.push(e);
                n.push(!1);
            } else {
                if (!Array.isArray(e) || !e.length || e.length !== t.handles + 1) throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
                n = e;
            }
            t.connect = n;
        }
        function w(t, e) {
            switch (e) {
              case "horizontal":
                t.ort = 0;
                break;

              case "vertical":
                t.ort = 1;
                break;

              default:
                throw new Error("noUiSlider: 'orientation' option is invalid.");
            }
        }
        function E(t, e) {
            if (!i(e)) throw new Error("noUiSlider: 'margin' option must be numeric.");
            0 !== e && (t.margin = t.spectrum.getDistance(e));
        }
        function P(t, e) {
            if (!i(e)) throw new Error("noUiSlider: 'limit' option must be numeric.");
            if (t.limit = t.spectrum.getDistance(e), !t.limit || t.handles < 2) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
        }
        function C(t, e) {
            var r;
            if (!i(e) && !Array.isArray(e)) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
            if (Array.isArray(e) && 2 !== e.length && !i(e[0]) && !i(e[1])) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
            if (0 !== e) {
                for (Array.isArray(e) || (e = [ e, e ]), t.padding = [ t.spectrum.getDistance(e[0]), t.spectrum.getDistance(e[1]) ], 
                r = 0; r < t.spectrum.xNumSteps.length - 1; r++) if (t.padding[0][r] < 0 || t.padding[1][r] < 0) throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
                var n = e[0] + e[1];
                e = t.spectrum.xVal[0];
                if (1 < n / (t.spectrum.xVal[t.spectrum.xVal.length - 1] - e)) throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.");
            }
        }
        function N(t, e) {
            switch (e) {
              case "ltr":
                t.dir = 0;
                break;

              case "rtl":
                t.dir = 1;
                break;

              default:
                throw new Error("noUiSlider: 'direction' option was not recognized.");
            }
        }
        function V(t, e) {
            if ("string" != typeof e) throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
            var r = 0 <= e.indexOf("tap"), n = 0 <= e.indexOf("drag"), i = 0 <= e.indexOf("fixed"), o = 0 <= e.indexOf("snap"), s = 0 <= e.indexOf("hover"), a = 0 <= e.indexOf("unconstrained"), l = 0 <= e.indexOf("drag-all");
            e = 0 <= e.indexOf("smooth-steps");
            if (i) {
                if (2 !== t.handles) throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
                E(t, t.start[1] - t.start[0]);
            }
            if (a && (t.margin || t.limit)) throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
            t.events = {
                tap: r || o,
                drag: n,
                dragAll: l,
                smoothSteps: e,
                fixed: i,
                snap: o,
                hover: s,
                unconstrained: a
            };
        }
        function A(t, e) {
            if (!1 !== e) if (!0 === e || n(e)) {
                t.tooltips = [];
                for (var r = 0; r < t.handles; r++) t.tooltips.push(e);
            } else {
                if ((e = pt(e)).length !== t.handles) throw new Error("noUiSlider: must pass a formatter for all handles.");
                e.forEach((function(t) {
                    if ("boolean" != typeof t && !n(t)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
                })), t.tooltips = e;
            }
        }
        function k(t, e) {
            if (e.length !== t.handles) throw new Error("noUiSlider: must pass a attributes for all handles.");
            t.handleAttributes = e;
        }
        function M(t, e) {
            if (!n(e)) throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
            t.ariaFormat = e;
        }
        function U(t, e) {
            if (!n(r = e) || "function" != typeof r.from) throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
            var r;
            t.format = e;
        }
        function D(t, e) {
            if ("boolean" != typeof e) throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");
            t.keyboardSupport = e;
        }
        function O(t, e) {
            t.documentElement = e;
        }
        function L(t, e) {
            if ("string" != typeof e && !1 !== e) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
            t.cssPrefix = e;
        }
        function T(e, r) {
            if ("object" != typeof r) throw new Error("noUiSlider: 'cssClasses' must be an object.");
            "string" == typeof e.cssPrefix ? (e.cssClasses = {}, Object.keys(r).forEach((function(t) {
                e.cssClasses[t] = e.cssPrefix + r[t];
            }))) : e.cssClasses = r;
        }
        function gt(e) {
            var r = {
                margin: null,
                limit: null,
                padding: null,
                animate: !0,
                animationDuration: 300,
                ariaFormat: c,
                format: c
            }, n = {
                step: {
                    r: !1,
                    t: f
                },
                keyboardPageMultiplier: {
                    r: !1,
                    t: d
                },
                keyboardMultiplier: {
                    r: !1,
                    t: h
                },
                keyboardDefaultStep: {
                    r: !1,
                    t: m
                },
                start: {
                    r: !0,
                    t: v
                },
                connect: {
                    r: !0,
                    t: y
                },
                direction: {
                    r: !0,
                    t: N
                },
                snap: {
                    r: !1,
                    t: b
                },
                animate: {
                    r: !1,
                    t: S
                },
                animationDuration: {
                    r: !1,
                    t: x
                },
                range: {
                    r: !0,
                    t: g
                },
                orientation: {
                    r: !1,
                    t: w
                },
                margin: {
                    r: !1,
                    t: E
                },
                limit: {
                    r: !1,
                    t: P
                },
                padding: {
                    r: !1,
                    t: C
                },
                behaviour: {
                    r: !0,
                    t: V
                },
                ariaFormat: {
                    r: !1,
                    t: M
                },
                format: {
                    r: !1,
                    t: U
                },
                tooltips: {
                    r: !1,
                    t: A
                },
                keyboardSupport: {
                    r: !0,
                    t: D
                },
                documentElement: {
                    r: !1,
                    t: O
                },
                cssPrefix: {
                    r: !0,
                    t: L
                },
                cssClasses: {
                    r: !0,
                    t: T
                },
                handleAttributes: {
                    r: !1,
                    t: k
                }
            }, i = {
                connect: !1,
                direction: "ltr",
                behaviour: "tap",
                orientation: "horizontal",
                keyboardSupport: !0,
                cssPrefix: "noUi-",
                cssClasses: p,
                keyboardPageMultiplier: 5,
                keyboardMultiplier: 1,
                keyboardDefaultStep: 10
            };
            e.format && !e.ariaFormat && (e.ariaFormat = e.format), Object.keys(n).forEach((function(t) {
                if (at(e[t]) || void 0 !== i[t]) n[t].t(r, (at(e[t]) ? e : i)[t]); else if (n[t].r) throw new Error("noUiSlider: '" + t + "' is required.");
            })), r.pips = e.pips;
            var t = document.createElement("div"), o = void 0 !== t.style.msTransform;
            t = void 0 !== t.style.transform;
            r.transformRule = t ? "transform" : o ? "msTransform" : "webkitTransform";
            return r.style = [ [ "left", "top" ], [ "right", "bottom" ] ][r.dir][r.ort], r;
        }
        function j(t, f, o) {
            var i, l, a, n, s, u, c = window.navigator.pointerEnabled ? {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup"
            } : window.navigator.msPointerEnabled ? {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp"
            } : {
                start: "mousedown touchstart",
                move: "mousemove touchmove",
                end: "mouseup touchend"
            }, p = window.CSS && CSS.supports && CSS.supports("touch-action", "none") && function() {
                var t = !1;
                try {
                    var e = Object.defineProperty({}, "passive", {
                        get: function() {
                            t = !0;
                        }
                    });
                    window.addEventListener("test", null, e);
                } catch (t) {}
                return t;
            }(), d = t, S = f.spectrum, h = [], m = [], g = [], v = 0, b = {}, x = t.ownerDocument, y = f.documentElement || x.documentElement, w = x.body, E = "rtl" === x.dir || 1 === f.ort ? 0 : 100;
            function P(t, e) {
                var r = x.createElement("div");
                return e && ft(r, e), t.appendChild(r), r;
            }
            function C(t, e) {
                t = P(t, f.cssClasses.origin);
                var r, n = P(t, f.cssClasses.handle);
                return P(n, f.cssClasses.touchArea), n.setAttribute("data-handle", String(e)), f.keyboardSupport && (n.setAttribute("tabindex", "0"), 
                n.addEventListener("keydown", (function(t) {
                    return function(t, e) {
                        if (V() || A(e)) return !1;
                        var r = [ "Left", "Right" ], n = [ "Down", "Up" ], i = [ "PageDown", "PageUp" ], o = [ "Home", "End" ];
                        f.dir && !f.ort ? r.reverse() : f.ort && !f.dir && (n.reverse(), i.reverse());
                        var s = t.key.replace("Arrow", ""), a = s === i[0], l = s === i[1];
                        i = s === n[0] || s === r[0] || a, n = s === n[1] || s === r[1] || l, r = s === o[0], 
                        o = s === o[1];
                        if (!(i || n || r || o)) return !0;
                        if (t.preventDefault(), n || i) {
                            var u = i ? 0 : 1;
                            u = nt(e)[u];
                            if (null === u) return !1;
                            !1 === u && (u = S.getDefaultStep(m[e], i, f.keyboardDefaultStep)), u *= l || a ? f.keyboardPageMultiplier : f.keyboardMultiplier, 
                            u = Math.max(u, 1e-7), u *= i ? -1 : 1, u = h[e] + u;
                        } else u = o ? f.spectrum.xVal[f.spectrum.xVal.length - 1] : f.spectrum.xVal[0];
                        return Q(e, S.toStepping(u), !0, !0), I("slide", e), I("update", e), I("change", e), 
                        I("set", e), !1;
                    }(t, e);
                }))), void 0 !== f.handleAttributes && (r = f.handleAttributes[e], Object.keys(r).forEach((function(t) {
                    n.setAttribute(t, r[t]);
                }))), n.setAttribute("role", "slider"), n.setAttribute("aria-orientation", f.ort ? "vertical" : "horizontal"), 
                0 === e ? ft(n, f.cssClasses.handleLower) : e === f.handles - 1 && ft(n, f.cssClasses.handleUpper), 
                t.handle = n, t;
            }
            function N(t, e) {
                return !!e && P(t, f.cssClasses.connect);
            }
            function e(t, e) {
                return !(!f.tooltips || !f.tooltips[e]) && P(t.firstChild, f.cssClasses.tooltip);
            }
            function V() {
                return d.hasAttribute("disabled");
            }
            function A(t) {
                return l[t].hasAttribute("disabled");
            }
            function k() {
                s && (Y("update" + mt.tooltips), s.forEach((function(t) {
                    t && st(t);
                })), s = null);
            }
            function M() {
                k(), s = l.map(e), X("update" + mt.tooltips, (function(t, e, r) {
                    s && f.tooltips && !1 !== s[e] && (t = t[e], !0 !== f.tooltips[e] && (t = f.tooltips[e].to(r[e])), 
                    s[e].innerHTML = t);
                }));
            }
            function U(t, e) {
                return t.map((function(t) {
                    return S.fromStepping(e ? S.getStep(t) : t);
                }));
            }
            function D(d) {
                var h = function(t) {
                    if (t.mode === ot.PipsMode.Range || t.mode === ot.PipsMode.Steps) return S.xVal;
                    if (t.mode !== ot.PipsMode.Count) return t.mode === ot.PipsMode.Positions ? U(t.values, t.stepped) : t.mode === ot.PipsMode.Values ? t.stepped ? t.values.map((function(t) {
                        return S.fromStepping(S.getStep(S.toStepping(t)));
                    })) : t.values : [];
                    if (t.values < 2) throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
                    for (var e = t.values - 1, r = 100 / e, n = []; e--; ) n[e] = e * r;
                    return n.push(100), U(n, t.stepped);
                }(d), m = {}, t = S.xVal[0], e = S.xVal[S.xVal.length - 1], g = !1, v = !1, b = 0;
                return (h = h.slice().sort((function(t, e) {
                    return t - e;
                })).filter((function(t) {
                    return !this[t] && (this[t] = !0);
                }), {}))[0] !== t && (h.unshift(t), g = !0), h[h.length - 1] !== e && (h.push(e), 
                v = !0), h.forEach((function(t, e) {
                    t;
                    var r, n, i, o, s, a, l, u, c = h[e + 1], p = d.mode === ot.PipsMode.Steps, f = (f = p ? S.xNumSteps[e] : f) || c - t;
                    for (void 0 === c && (c = t), f = Math.max(f, 1e-7), r = t; r <= c; r = Number((r + f).toFixed(7))) {
                        for (a = (o = (i = S.toStepping(r)) - b) / (d.density || 1), u = o / (l = Math.round(a)), 
                        n = 1; n <= l; n += 1) m[(s = b + n * u).toFixed(5)] = [ S.fromStepping(s), 0 ];
                        a = -1 < h.indexOf(r) ? ot.PipsType.LargeValue : p ? ot.PipsType.SmallValue : ot.PipsType.NoValue, 
                        !e && g && r !== c && (a = 0), r === c && v || (m[i.toFixed(5)] = [ r, a ]), b = i;
                    }
                })), m;
            }
            function O(i, o, s) {
                var t, a = x.createElement("div"), n = ((t = {})[ot.PipsType.None] = "", t[ot.PipsType.NoValue] = f.cssClasses.valueNormal, 
                t[ot.PipsType.LargeValue] = f.cssClasses.valueLarge, t[ot.PipsType.SmallValue] = f.cssClasses.valueSub, 
                t), l = ((t = {})[ot.PipsType.None] = "", t[ot.PipsType.NoValue] = f.cssClasses.markerNormal, 
                t[ot.PipsType.LargeValue] = f.cssClasses.markerLarge, t[ot.PipsType.SmallValue] = f.cssClasses.markerSub, 
                t), u = [ f.cssClasses.valueHorizontal, f.cssClasses.valueVertical ], c = [ f.cssClasses.markerHorizontal, f.cssClasses.markerVertical ];
                function p(t, e) {
                    var r = e === f.cssClasses.value;
                    return e + " " + (r ? u : c)[f.ort] + " " + (r ? n : l)[t];
                }
                return ft(a, f.cssClasses.pips), ft(a, 0 === f.ort ? f.cssClasses.pipsHorizontal : f.cssClasses.pipsVertical), 
                Object.keys(i).forEach((function(t) {
                    var e, r, n;
                    r = i[e = t][0], n = i[t][1], (n = o ? o(r, n) : n) !== ot.PipsType.None && ((t = P(a, !1)).className = p(n, f.cssClasses.marker), 
                    t.style[f.style] = e + "%", n > ot.PipsType.NoValue && ((t = P(a, !1)).className = p(n, f.cssClasses.value), 
                    t.setAttribute("data-value", String(r)), t.style[f.style] = e + "%", t.innerHTML = String(s.to(r))));
                })), a;
            }
            function L() {
                n && (st(n), n = null);
            }
            function T(t) {
                L();
                var e = D(t), r = t.filter;
                t = t.format || {
                    to: function(t) {
                        return String(Math.round(t));
                    }
                };
                return n = d.appendChild(O(e, r, t));
            }
            function j() {
                var t = i.getBoundingClientRect(), e = "offset" + [ "Width", "Height" ][f.ort];
                return 0 === f.ort ? t.width || i[e] : t.height || i[e];
            }
            function z(n, i, o, s) {
                function e(t) {
                    var e, r = function(e, t, r) {
                        var n = 0 === e.type.indexOf("touch"), i = 0 === e.type.indexOf("mouse"), o = 0 === e.type.indexOf("pointer"), s = 0, a = 0;
                        0 === e.type.indexOf("MSPointer") && (o = !0);
                        if ("mousedown" === e.type && !e.buttons && !e.touches) return !1;
                        if (n) {
                            var l = function(t) {
                                t = t.target;
                                return t === r || r.contains(t) || e.composed && e.composedPath().shift() === r;
                            };
                            if ("touchstart" === e.type) {
                                n = Array.prototype.filter.call(e.touches, l);
                                if (1 < n.length) return !1;
                                s = n[0].pageX, a = n[0].pageY;
                            } else {
                                l = Array.prototype.find.call(e.changedTouches, l);
                                if (!l) return !1;
                                s = l.pageX, a = l.pageY;
                            }
                        }
                        t = t || ht(x), (i || o) && (s = e.clientX + t.x, a = e.clientY + t.y);
                        return e.pageOffset = t, e.points = [ s, a ], e.cursor = i || o, e;
                    }(t, s.pageOffset, s.target || i);
                    return !!r && !(V() && !s.doNotReject) && (e = d, t = f.cssClasses.tap, !((e.classList ? e.classList.contains(t) : new RegExp("\\b" + t + "\\b").test(e.className)) && !s.doNotReject) && !(n === c.start && void 0 !== r.buttons && 1 < r.buttons) && (!s.hover || !r.buttons) && (p || r.preventDefault(), 
                    r.calcPoint = r.points[f.ort], void o(r, s)));
                }
                var r = [];
                return n.split(" ").forEach((function(t) {
                    i.addEventListener(t, e, !!p && {
                        passive: !0
                    }), r.push([ t, e ]);
                })), r;
            }
            function H(t) {
                var e, r, n = ct(n = 100 * (t - (n = i, e = f.ort, r = n.getBoundingClientRect(), 
                n = (t = n.ownerDocument).documentElement, t = ht(t), /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (t.x = 0), 
                e ? r.top + t.y - n.clientTop : r.left + t.x - n.clientLeft)) / j());
                return f.dir ? 100 - n : n;
            }
            function F(t, e) {
                "mouseout" === t.type && "HTML" === t.target.nodeName && null === t.relatedTarget && _(t, e);
            }
            function R(t, e) {
                if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === t.buttons && 0 !== e.buttonsProperty) return _(t, e);
                t = (f.dir ? -1 : 1) * (t.calcPoint - e.startCalcPoint);
                G(0 < t, 100 * t / e.baseSize, e.locations, e.handleNumbers, e.connect);
            }
            function _(t, e) {
                e.handle && (dt(e.handle, f.cssClasses.active), --v), e.listeners.forEach((function(t) {
                    y.removeEventListener(t[0], t[1]);
                })), 0 === v && (dt(d, f.cssClasses.drag), K(), t.cursor && (w.style.cursor = "", 
                w.removeEventListener("selectstart", lt))), f.events.smoothSteps && (e.handleNumbers.forEach((function(t) {
                    Q(t, m[t], !0, !0, !1, !1);
                })), e.handleNumbers.forEach((function(t) {
                    I("update", t);
                }))), e.handleNumbers.forEach((function(t) {
                    I("change", t), I("set", t), I("end", t);
                }));
            }
            function B(t, e) {
                var r, n, i, o;
                e.handleNumbers.some(A) || (1 === e.handleNumbers.length && (o = l[e.handleNumbers[0]].children[0], 
                v += 1, ft(o, f.cssClasses.active)), t.stopPropagation(), n = z(c.move, y, R, {
                    target: t.target,
                    handle: o,
                    connect: e.connect,
                    listeners: r = [],
                    startCalcPoint: t.calcPoint,
                    baseSize: j(),
                    pageOffset: t.pageOffset,
                    handleNumbers: e.handleNumbers,
                    buttonsProperty: t.buttons,
                    locations: m.slice()
                }), i = z(c.end, y, _, {
                    target: t.target,
                    handle: o,
                    listeners: r,
                    doNotReject: !0,
                    handleNumbers: e.handleNumbers
                }), o = z("mouseout", y, F, {
                    target: t.target,
                    handle: o,
                    listeners: r,
                    doNotReject: !0,
                    handleNumbers: e.handleNumbers
                }), r.push.apply(r, n.concat(i, o)), t.cursor && (w.style.cursor = getComputedStyle(t.target).cursor, 
                1 < l.length && ft(d, f.cssClasses.drag), w.addEventListener("selectstart", lt, !1)), 
                e.handleNumbers.forEach((function(t) {
                    I("start", t);
                })));
            }
            function r(t) {
                t.stopPropagation();
                var i, o, s, e = H(t.calcPoint), r = (i = e, s = !(o = 100), l.forEach((function(t, e) {
                    var r, n;
                    A(e) || (r = m[e], ((n = Math.abs(r - i)) < o || n <= o && r < i || 100 === n && 100 === o) && (s = e, 
                    o = n));
                })), s);
                !1 !== r && (f.events.snap || ut(d, f.cssClasses.tap, f.animationDuration), Q(r, e, !0, !0), 
                K(), I("slide", r, !0), I("update", r, !0), f.events.snap ? B(t, {
                    handleNumbers: [ r ]
                }) : (I("change", r, !0), I("set", r, !0)));
            }
            function q(t) {
                t = H(t.calcPoint), t = S.getStep(t);
                var e = S.fromStepping(t);
                Object.keys(b).forEach((function(t) {
                    "hover" === t.split(".")[0] && b[t].forEach((function(t) {
                        t.call(it, e);
                    }));
                }));
            }
            function X(t, e) {
                b[t] = b[t] || [], b[t].push(e), "update" === t.split(".")[0] && l.forEach((function(t, e) {
                    I("update", e);
                }));
            }
            function Y(t) {
                var n = t && t.split(".")[0], i = n ? t.substring(n.length) : t;
                Object.keys(b).forEach((function(t) {
                    var e = t.split(".")[0], r = t.substring(e.length);
                    n && n !== e || i && i !== r || ((e = r) !== mt.aria && e !== mt.tooltips || i === r) && delete b[t];
                }));
            }
            function I(r, n, i) {
                Object.keys(b).forEach((function(t) {
                    var e = t.split(".")[0];
                    r === e && b[t].forEach((function(t) {
                        t.call(it, h.map(f.format.to), n, h.slice(), i || !1, m.slice(), it);
                    }));
                }));
            }
            function W(t, e, r, n, i, o, s) {
                var a;
                return 1 < l.length && !f.events.unconstrained && (n && 0 < e && (a = S.getAbsoluteDistance(t[e - 1], f.margin, !1), 
                r = Math.max(r, a)), i && e < l.length - 1 && (a = S.getAbsoluteDistance(t[e + 1], f.margin, !0), 
                r = Math.min(r, a))), 1 < l.length && f.limit && (n && 0 < e && (a = S.getAbsoluteDistance(t[e - 1], f.limit, !1), 
                r = Math.min(r, a)), i && e < l.length - 1 && (a = S.getAbsoluteDistance(t[e + 1], f.limit, !0), 
                r = Math.max(r, a))), f.padding && (0 === e && (a = S.getAbsoluteDistance(0, f.padding[0], !1), 
                r = Math.max(r, a)), e === l.length - 1 && (a = S.getAbsoluteDistance(100, f.padding[1], !0), 
                r = Math.min(r, a))), !((r = ct(r = !s ? S.getStep(r) : r)) === t[e] && !o) && r;
            }
            function $(t, e) {
                var r = f.ort;
                return (r ? e : t) + ", " + (r ? t : e);
            }
            function G(t, r, n, e, i) {
                var o = n.slice(), s = e[0], a = f.events.smoothSteps, l = [ !t, t ], u = [ t, !t ];
                e = e.slice(), t && e.reverse(), 1 < e.length ? e.forEach((function(t, e) {
                    e = W(o, t, o[t] + r, l[e], u[e], !1, a);
                    !1 === e ? r = 0 : (r = e - o[t], o[t] = e);
                })) : l = u = [ !0 ];
                var c = !1;
                e.forEach((function(t, e) {
                    c = Q(t, n[t] + r, l[e], u[e], !1, a) || c;
                })), c && (e.forEach((function(t) {
                    I("update", t), I("slide", t);
                })), null != i && I("drag", s));
            }
            function J(t, e) {
                return f.dir ? 100 - t - e : t;
            }
            function K() {
                g.forEach((function(t) {
                    var e = 50 < m[t] ? -1 : 1;
                    e = 3 + (l.length + e * t);
                    l[t].style.zIndex = String(e);
                }));
            }
            function Q(t, e, r, n, i, o) {
                return !1 !== (e = i ? e : W(m, t, e, r, n, !1, o)) && (e, m[t] = e, h[t] = S.fromStepping(e), 
                e = "translate(" + $(J(e, 0) - E + "%", "0") + ")", l[t].style[f.transformRule] = e, 
                Z(t), Z(t + 1), !0);
            }
            function Z(t) {
                var e, r;
                a[t] && (r = 100, e = "translate(" + $(J(e = (e = 0) !== t ? m[t - 1] : e, r = (r = t !== a.length - 1 ? m[t] : r) - e) + "%", "0") + ")", 
                r = "scale(" + $(r / 100, "1") + ")", a[t].style[f.transformRule] = e + " " + r);
            }
            function tt(t, e) {
                return null === t || !1 === t || void 0 === t ? m[e] : ("number" == typeof t && (t = String(t)), 
                !1 === (t = !1 !== (t = f.format.from(t)) ? S.toStepping(t) : t) || isNaN(t) ? m[e] : t);
            }
            function et(t, e, r) {
                var n = pt(t);
                t = void 0 === m[0];
                e = void 0 === e || e, f.animate && !t && ut(d, f.cssClasses.tap, f.animationDuration), 
                g.forEach((function(t) {
                    Q(t, tt(n[t], t), !0, !1, r);
                }));
                var i, o = 1 === g.length ? 0 : 1;
                for (t && S.hasNoSize() && (r = !0, m[0] = 0, 1 < g.length && (i = 100 / (g.length - 1), 
                g.forEach((function(t) {
                    m[t] = t * i;
                })))); o < g.length; ++o) g.forEach((function(t) {
                    Q(t, m[t], !0, !0, r);
                }));
                K(), g.forEach((function(t) {
                    I("update", t), null !== n[t] && e && I("set", t);
                }));
            }
            function rt(t) {
                if (t = void 0 === t ? !1 : t) return 1 === h.length ? h[0] : h.slice(0);
                t = h.map(f.format.to);
                return 1 === t.length ? t[0] : t;
            }
            function nt(t) {
                var e = m[t], r = S.getNearbySteps(e), n = h[t], i = r.thisStep.step;
                t = null;
                if (f.snap) return [ n - r.stepBefore.startValue || null, r.stepAfter.startValue - n || null ];
                !1 !== i && n + i > r.stepAfter.startValue && (i = r.stepAfter.startValue - n), 
                t = n > r.thisStep.startValue ? r.thisStep.step : !1 !== r.stepBefore.step && n - r.stepBefore.highestStep, 
                100 === e ? i = null : 0 === e && (t = null);
                e = S.countStepDecimals();
                return null !== i && !1 !== i && (i = Number(i.toFixed(e))), [ t = null !== t && !1 !== t ? Number(t.toFixed(e)) : t, i ];
            }
            ft(t = d, f.cssClasses.target), 0 === f.dir ? ft(t, f.cssClasses.ltr) : ft(t, f.cssClasses.rtl), 
            0 === f.ort ? ft(t, f.cssClasses.horizontal) : ft(t, f.cssClasses.vertical), ft(t, "rtl" === getComputedStyle(t).direction ? f.cssClasses.textDirectionRtl : f.cssClasses.textDirectionLtr), 
            i = P(t, f.cssClasses.base), function(t, e) {
                var r = P(e, f.cssClasses.connects);
                l = [], (a = []).push(N(r, t[0]));
                for (var n = 0; n < f.handles; n++) l.push(C(e, n)), g[n] = n, a.push(N(r, t[n + 1]));
            }(f.connect, i), (u = f.events).fixed || l.forEach((function(t, e) {
                z(c.start, t.children[0], B, {
                    handleNumbers: [ e ]
                });
            })), u.tap && z(c.start, i, r, {}), u.hover && z(c.move, i, q, {
                hover: !0
            }), u.drag && a.forEach((function(e, t) {
                var r, n, i, o, s;
                !1 !== e && 0 !== t && t !== a.length - 1 && (r = l[t - 1], n = l[t], i = [ e ], 
                o = [ r, n ], s = [ t - 1, t ], ft(e, f.cssClasses.draggable), u.fixed && (i.push(r.children[0]), 
                i.push(n.children[0])), u.dragAll && (o = l, s = g), i.forEach((function(t) {
                    z(c.start, t, B, {
                        handles: o,
                        handleNumbers: s,
                        connect: e
                    });
                })));
            })), et(f.start), f.pips && T(f.pips), f.tooltips && M(), Y("update" + mt.aria), 
            X("update" + mt.aria, (function(t, e, o, r, s) {
                g.forEach((function(t) {
                    var e = l[t], r = W(m, t, 0, !0, !0, !0), n = W(m, t, 100, !0, !0, !0), i = s[t];
                    t = String(f.ariaFormat.to(o[t])), r = S.fromStepping(r).toFixed(1), n = S.fromStepping(n).toFixed(1), 
                    i = S.fromStepping(i).toFixed(1);
                    e.children[0].setAttribute("aria-valuemin", r), e.children[0].setAttribute("aria-valuemax", n), 
                    e.children[0].setAttribute("aria-valuenow", i), e.children[0].setAttribute("aria-valuetext", t);
                }));
            }));
            var it = {
                destroy: function() {
                    for (Y(mt.aria), Y(mt.tooltips), Object.keys(f.cssClasses).forEach((function(t) {
                        dt(d, f.cssClasses[t]);
                    })); d.firstChild; ) d.removeChild(d.firstChild);
                    delete d.noUiSlider;
                },
                steps: function() {
                    return g.map(nt);
                },
                on: X,
                off: Y,
                get: rt,
                set: et,
                setHandle: function(t, e, r, n) {
                    if (!(0 <= (t = Number(t)) && t < g.length)) throw new Error("noUiSlider: invalid handle number, got: " + t);
                    Q(t, tt(e, t), !0, !0, n), I("update", t), r && I("set", t);
                },
                reset: function(t) {
                    et(f.start, t);
                },
                disable: function(t) {
                    null != t ? (l[t].setAttribute("disabled", ""), l[t].handle.removeAttribute("tabindex")) : (d.setAttribute("disabled", ""), 
                    l.forEach((function(t) {
                        t.handle.removeAttribute("tabindex");
                    })));
                },
                enable: function(t) {
                    null != t ? (l[t].removeAttribute("disabled"), l[t].handle.setAttribute("tabindex", "0")) : (d.removeAttribute("disabled"), 
                    l.forEach((function(t) {
                        t.removeAttribute("disabled"), t.handle.setAttribute("tabindex", "0");
                    })));
                },
                __moveHandles: function(t, e, r) {
                    G(t, e, m, r);
                },
                options: o,
                updateOptions: function(e, t) {
                    var r = rt(), n = [ "margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips" ];
                    n.forEach((function(t) {
                        void 0 !== e[t] && (o[t] = e[t]);
                    }));
                    var i = gt(o);
                    n.forEach((function(t) {
                        void 0 !== e[t] && (f[t] = i[t]);
                    })), S = i.spectrum, f.margin = i.margin, f.limit = i.limit, f.padding = i.padding, 
                    f.pips ? T(f.pips) : L(), (f.tooltips ? M : k)(), m = [], et(at(e.start) ? e.start : r, t);
                },
                target: d,
                removePips: L,
                removeTooltips: k,
                getPositions: function() {
                    return m.slice();
                },
                getTooltips: function() {
                    return s;
                },
                getOrigins: function() {
                    return l;
                },
                pips: T
            };
            return it;
        }
        function z(t, e) {
            if (!t || !t.nodeName) throw new Error("noUiSlider: create requires a single element, got: " + t);
            if (t.noUiSlider) throw new Error("noUiSlider: Slider was already initialized.");
            e = j(t, gt(e), e);
            return t.noUiSlider = e;
        }
        var H = {
            __spectrum: u,
            cssClasses: p,
            create: z
        };
        ot.create = z, ot.cssClasses = p, ot.default = H, Object.defineProperty(ot, "__esModule", {
            value: !0
        });
    }));
    const imgToChange = document.querySelector(".imgToChange");
    const blockOneFirst = document.querySelector(".blockOne__first");
    const blockOneSecond = document.querySelector(".blockOne__second");
    const blockOneThird = document.querySelector(".blockOne__third");
    const blockOne = document.querySelector(".factor-configurator1");
    const blockThree = document.querySelector(".factor-configurator3");
    const blockTwo = document.querySelector(".factor-configurator2");
    blockOneFirst.addEventListener("click", (e => {
        blockOneFirst.classList.add("block-active");
        blockOneSecond.classList.remove("block-active");
        blockOneThird.classList.remove("block-active");
        imgToChange.innerHTML = '<img src="img/windowOnePlus.png" alt="img">';
    }));
    blockOneSecond.addEventListener("click", (e => {
        blockOneSecond.classList.add("block-active");
        blockOneFirst.classList.remove("block-active");
        blockOneThird.classList.remove("block-active");
        imgToChange.innerHTML = '<img src="img/windowOneArrow.png" alt="img">';
    }));
    blockOneThird.addEventListener("click", (e => {
        blockOneThird.classList.add("block-active");
        blockOneFirst.classList.remove("block-active");
        blockOneSecond.classList.remove("block-active");
        imgToChange.innerHTML = '<img src="img/windowOneStar.png" alt="img">';
    }));
    const blockTwoFirst = document.querySelector(".blockTwo__first");
    const blockTwoSecond = document.querySelector(".blockTwo__second");
    const blockTwoThird = document.querySelector(".blockTwo__third");
    const blockTwoForth = document.querySelector(".blockTwo__forth");
    blockTwoFirst.addEventListener("click", (e => {
        blockTwoFirst.classList.add("block-active");
        blockTwoSecond.classList.remove("block-active");
        blockTwoThird.classList.remove("block-active");
        blockTwoForth.classList.remove("block-active");
        imgToChange.innerHTML = '<img src="img/plusArrow.png" alt="img">';
    }));
    blockTwoSecond.addEventListener("click", (e => {
        blockTwoSecond.classList.add("block-active");
        blockTwoFirst.classList.remove("block-active");
        blockTwoThird.classList.remove("block-active");
        blockTwoForth.classList.remove("block-active");
        imgToChange.innerHTML = '<img src="img/twoArrows.png" alt="img">';
    }));
    blockTwoThird.addEventListener("click", (e => {
        blockTwoThird.classList.add("block-active");
        blockTwoFirst.classList.remove("block-active");
        blockTwoSecond.classList.remove("block-active");
        blockTwoForth.classList.remove("block-active");
        imgToChange.innerHTML = '<img src="img/arrowStar.png" alt="img">';
    }));
    blockTwoForth.addEventListener("click", (e => {
        blockTwoThird.classList.remove("block-active");
        blockTwoFirst.classList.remove("block-active");
        blockTwoSecond.classList.remove("block-active");
        blockTwoForth.classList.add("block-active");
        imgToChange.innerHTML = '<img src="img/plusStar.png" alt="img">';
    }));
    const blockThreeFirst = document.querySelector(".blockThree__first");
    const blockThreeSecond = document.querySelector(".blockThree__second");
    const blockThreeThird = document.querySelector(".blockThree__third");
    blockThreeFirst.addEventListener("click", (e => {
        blockThreeFirst.classList.add("block-active");
        blockThreeSecond.classList.remove("block-active");
        blockThreeThird.classList.remove("block-active");
        imgToChange.innerHTML = '<img src="img/threeFirst.png" alt="img">';
    }));
    blockThreeSecond.addEventListener("click", (e => {
        blockThreeSecond.classList.add("block-active");
        blockThreeFirst.classList.remove("block-active");
        blockThreeThird.classList.remove("block-active");
        imgToChange.innerHTML = '<img src="img/threeSecond.png" alt="img">';
    }));
    blockThreeThird.addEventListener("click", (e => {
        blockThreeThird.classList.add("block-active");
        blockThreeFirst.classList.remove("block-active");
        blockThreeSecond.classList.remove("block-active");
        imgToChange.innerHTML = '<img src="img/threeThird.png" alt="img">';
    }));
    setInterval((function() {
        const selectContent = document.querySelector(".select__content");
        if (selectContent.innerHTML == "Двустворчатые") {
            blockOne.style.display = "none";
            blockThree.style.display = "none";
            blockTwo.style.display = "flex";
            blockOneFirst.classList.remove("block-active");
            blockOneSecond.classList.remove("block-active");
            blockOneThird.classList.remove("block-active");
        } else if (selectContent.innerHTML == "Одностворчатые") {
            blockTwo.style.display = "none";
            blockThree.style.display = "none";
            blockOne.style.display = "flex";
            blockTwoFirst.classList.remove("block-active");
            blockTwoSecond.classList.remove("block-active");
            blockTwoThird.classList.remove("block-active");
            blockTwoForth.classList.remove("block-active");
        } else if (selectContent.innerHTML == "Трехстворчатые") {
            blockTwo.style.display = "none";
            blockThree.style.display = "flex";
            blockOne.style.display = "none";
        }
    }), 500);
    const check1 = document.querySelector("#c_1");
    const check2 = document.querySelector("#c_2");
    let selectContent;
    document.addEventListener("DOMContentLoaded", (function() {
        document.getElementById("height-slider");
        const t = document.getElementById("width-slider"), s = document.getElementById("height-value"), l = document.getElementById("width-value"), i = document.getElementById("price-value"), c = document.querySelector(".window-credit__span1"), o = document.querySelector(".window-credit__span2");
        function a() {
            s.textContent = Math.round(rangeSliderValueElement.innerHTML), l.textContent = Math.round(t.value);
            let a;
            a = "2" == selectContent ? check1.checked && !check2.checked ? Math.round((1150 + 60 * (rangeSliderValueElement.innerHTML - 50) + 70 * (t.value - 50)) * 1.3 + 1610) : !check1.checked && check2.checked ? Math.round((1150 + 60 * (rangeSliderValueElement.innerHTML - 50) + 70 * (t.value - 50)) * 1.3 + 1622) : check1.checked && check2.checked ? Math.round((1150 + 60 * (rangeSliderValueElement.innerHTML - 50) + 70 * (t.value - 50)) * 1.3 + 3232) : Math.round((1150 + 60 * (rangeSliderValueElement.innerHTML - 50) + 70 * (t.value - 50)) * 1.3) : "3" == selectContent ? check1.checked && !check2.checked ? Math.round((1150 + 60 * (rangeSliderValueElement.innerHTML - 50) + 70 * (t.value - 50)) * 1.1 + 1610) : !check1.checked && check2.checked ? Math.round((1150 + 60 * (rangeSliderValueElement.innerHTML - 50) + 70 * (t.value - 50)) * 1.1 + 1622) : check1.checked && check2.checked ? Math.round((1150 + 60 * (rangeSliderValueElement.innerHTML - 50) + 70 * (t.value - 50)) * 1.1 + 3232) : Math.round((1150 + 60 * (rangeSliderValueElement.innerHTML - 50) + 70 * (t.value - 50)) * 1.1) : check1.checked && !check2.checked ? Math.round(1150 + 60 * (rangeSliderValueElement.innerHTML - 50) + 70 * (t.value - 50) + 1610) : !check1.checked && check2.checked ? Math.round(1150 + 60 * (rangeSliderValueElement.innerHTML - 50) + 70 * (t.value - 50) + 1622) : check1.checked && check2.checked ? Math.round(1150 + 60 * (rangeSliderValueElement.innerHTML - 50) + 70 * (t.value - 50) + 3232) : Math.round(1150 + 60 * (rangeSliderValueElement.innerHTML - 50) + 70 * (t.value - 50));
            o.textContent = a + 2062 + "р", c.textContent = Math.round(a / 12) + "р", i.textContent = a;
        }
        setInterval(a, 500), t.oninput = a, a();
        rangeSlider.noUiSlider.on("update", (function(values, handle) {
            rangeSliderValueElement.innerHTML = Math.round(values[handle]);
            a();
        }));
    }));
    const burger = document.querySelector(".icon-menu");
    const doc = document.querySelector("html");
    const list = document.querySelector(".menu__list");
    burger.addEventListener("click", (e => {
        if (!doc.classList.contains("menu-open")) list.classList.add("list-active"); else list.classList.remove("list-active");
    }));
    const catalogRight = document.querySelector(".select-catalog__right");
    const catalogLeft = document.querySelector(".select-catalog__left");
    const catalog2 = document.querySelector(".catalog__flex2");
    const catalog1 = document.querySelector(".catalog__flex1");
    catalogRight.addEventListener("click", (e => {
        catalogLeft.classList.remove("catalog-active");
        catalogRight.classList.add("catalog-active");
        catalog1.style.display = "none";
        catalog2.style.display = "flex";
    }));
    catalogLeft.addEventListener("click", (e => {
        catalogLeft.classList.add("catalog-active");
        catalogRight.classList.remove("catalog-active");
        catalog2.style.display = "none";
        catalog1.style.display = "flex";
    }));
    $(document).ready((function() {
        $("#phone1").mask("+7 (999) 999-99-99");
        $("#phone2").mask("+7 (999) 999-99-99");
    }));
    const itemMenu = document.querySelectorAll(".menu__link");
    const listMen = document.querySelector(".menu__list");
    const docHtml = document.querySelector("html");
    itemMenu.forEach((e => {
        e.addEventListener("click", (event => {
            event.preventDefault();
            listMen.classList.remove("list-active");
            docHtml.classList.remove("lock");
            docHtml.classList.remove("menu-open");
        }));
    }));
    const S = document.querySelector(".blockTwo__first"), b = document.querySelector(".blockTwo__second"), y = document.querySelector(".blockTwo__third"), f = document.querySelector(".blockTwo__forth");
    const h = document.querySelector(".blockOne__first"), u = document.querySelector(".blockOne__second"), p = document.querySelector(".blockOne__third"), m = document.querySelector(".factor-configurator1"), g = document.querySelector(".factor-configurator3"), v = document.querySelector(".factor-configurator2");
    setInterval((function() {
        const e = document.querySelector(".select__content");
        "Двустворчатые" == e.innerHTML ? (selectContent = "2", m.style.display = "none", 
        g.style.display = "none", v.style.display = "flex", h.classList.remove("block-active"), 
        u.classList.remove("block-active"), p.classList.remove("block-active")) : "Одностворчатые" == e.innerHTML ? (selectContent = "1", 
        v.style.display = "none", g.style.display = "none", m.style.display = "flex", S.classList.remove("block-active"), 
        b.classList.remove("block-active"), y.classList.remove("block-active"), f.classList.remove("block-active")) : "Трехстворчатые" == e.innerHTML && (selectContent = "3", 
        v.style.display = "none", g.style.display = "flex", m.style.display = "none");
    }), 500);
    var rangeSlider = document.getElementById("slider-range");
    noUiSlider.create(rangeSlider, {
        start: [ 150 ],
        orientation: "vertical",
        direction: "rtl",
        range: {
            min: [ 50 ],
            max: [ 300 ]
        }
    });
    var rangeSliderValueElement = document.querySelector(".slider-range-value");
    const slider = document.getElementById("width-slider");
    slider.addEventListener("touchstart", (() => {
        document.body.style.overflow = "hidden";
    }));
    slider.addEventListener("touchend", (() => {
        document.body.style.overflow = "auto";
    }));
    const imagesToPreload = [ "img/windowOnePlus.png", "img/windowOneArrow.png", "img/windowOneStar.png", "img/plusArrow.png", "img/twoArrows.png", "img/arrowStar.png", "img/plusStar.png", "img/threeFirst.png", "img/threeSecond.png", "img/threeThird.png" ];
    function preloadImages(urls) {
        urls.forEach((url => {
            const img = new Image;
            img.src = url;
        }));
    }
    preloadImages(imagesToPreload);
    window["FLS"] = true;
    isWebp();
    menuInit();
})();