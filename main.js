class PopUpForm {
	removeError = (input) => {
		if (document.querySelector(`.error-${input.id}`))
			document.querySelector(`.error-${input.id}`).remove();
	};

	renderError = (input) => {
		this.removeError(input);
		const errorElement = document.createElement("h5");
		const parrentElement = document.querySelector(".form__errors");
		switch (input.type) {
			case "email":
				errorElement.textContent = "niepoprawny adres email";
				errorElement.classList.add("error__message", `error-${input.id}`);
				break;
			case "text":
				errorElement.textContent = "podaj imię";
				errorElement.classList.add("error__message", `error-${input.id}`);
				break;
			case "checkbox":
				errorElement.textContent = "wyraź zgodę na Lorem ipsum";
				errorElement.classList.add("error__message", `error-${input.id}`);
				break;
		}
		parrentElement.appendChild(errorElement);
	};

	validateEmail = (email) => {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	};

	validate = (input) => {
		switch (input.type) {
			case "email":
				return this.validateEmail(input.value);
			case "text":
				return input.value.length > 0;
			case "checkbox":
				return input.checked;
		}
	};

	validateInput = (input) => {
		if (this.validate(input)) {
			this.removeError(input);
			return true;
		} else {
			this.renderError(input);
			return false;
		}
	};

	labelShrinkOn = (input) => {
		const label = document.querySelector(`[for="${input.id}"]`);
		label.classList.add("form__input-label--text");
	};

	labelShrinkOf = (input) => {
		const label = document.querySelector(`[for="${input.id}"]`);
		if (input.value.length === 0)
			label.classList.remove("form__input-label--text");
	};

	addInputFuncionality = () => {
		const inputs = Array.from(document.querySelectorAll("input"));
		inputs.forEach((input) => {
			if (input.type !== "checkbox") {
				input.addEventListener("blur", () => {
					this.validateInput(input);
					this.labelShrinkOf(input);
				});
				input.addEventListener("focus", () => {
					this.labelShrinkOn(input);
				});
			} else {
				input.addEventListener("blur", () => {
					this.validateInput(input);
				});
			}
		});
	};

	showThankYouPage = () => {
		document.querySelector(".form__landing").classList.toggle("hidden");
		document.querySelector(".form__submitted").classList.toggle("hidden");
		const header = document.querySelector(".form__submitted .form__header");
		header.textContent = `${header.textContent} ${
			document.querySelector("#name").value
		}`;
	};

	checkAllInputs = () => {
		const inputs = Array.from(document.querySelectorAll("input")).map((input) =>
			this.validateInput(input)
		);
		console.log(inputs);
		if (!inputs.includes(false)) this.showThankYouPage();
	};

	addButtonFunctionality = () => {
		const sendButton = document.querySelector(".form__send .form__btn");
		sendButton.addEventListener("click", () => this.checkAllInputs());
		const closeButtons = Array.from(document.querySelectorAll(".form__close"));
		closeButtons.forEach((button) =>
			button.addEventListener("click", () =>
				document.querySelector(".form__container").remove()
			)
		);
	};

	getTemplate = () => document.querySelector(`#popup`).content.cloneNode(true);

	renderPopup = () => document.body.appendChild(this.getTemplate());

	startForm = () => {
		this.renderPopup();
		this.addInputFuncionality();
		this.addButtonFunctionality();
	};
}

(function onLoad() {
	const popUpForm = new PopUpForm();
	popUpForm.startForm();
	document
		.querySelector(".center__container button")
		.addEventListener("click", () => popUpForm.startForm());
})();
