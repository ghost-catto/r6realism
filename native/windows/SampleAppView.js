define(
	[
		"../../lib/howler.min.js",
		"../../lib/howler.core.min.js",
		"../../lib/lodash.js",
	],
	function () {
		var db = {
			attack  : [
				"../../sound/attack/attack (1).wav",
				"../../sound/attack/attack (2).wav",
				"../../sound/attack/attack (3).wav",
				"../../sound/attack/attack (4).wav",
				"../../sound/attack/attack (5).wav",
				"../../sound/attack/attack (6).wav",
				"../../sound/attack/attack (7).wav",
				"../../sound/attack/attack (8).wav",
				"../../sound/attack/attack (9).wav",
			],

			bang    : [
				"../../sound/bang/bang (1).wav",
				"../../sound/bang/bang (2).wav",
			],
			copy    : [
				"../../sound/copy/copy (2).wav",
				"../../sound/copy/copy (1).wav",
			],
			coverme : [
				"../../sound/cover/cover.wav",
			],
			help    : [
				"../../sound/help/help (1).wav",
				"../../sound/help/help (2).wav",
				"../../sound/help/help (3).wav",
				"../../sound/help/help (4).wav",
				"../../sound/help/help (5).wav",
			],
			moving  : [
				"../../sound/moving/moving.wav",
			],
			clear   : [
				"../../sound/clear/clear (1).wav",
				"../../sound/clear/clear (2).wav",
			],
		};

		Howler.usingWebAudio = true;
		Howler.autoSuspend = false;

		function generateRandomNumber (max) {
			return Math.floor(Math.random() * max);
		}

		function playDynamic () {
			dynamicVoice.play();
		}

		class SampleAppView {
			constructor () {
				// Methods:

				this._showExitMinimizeModal = this._showExitMinimizeModal.bind(this);
				this._hideExitMinimizeModal = this._hideExitMinimizeModal.bind(this);
				// Background window:
				this._backgroundWindow = overwolf.windows.getMainWindow();
				// Page elements:
				this._modal = document.getElementById("exitMinimizeModal");
				this._closeButton = document.getElementById("closeButton");
				this._minimizeHeaderButton = document.getElementById("minimizeButton");
				this._exitButton = document.getElementById("exit");
				this._minimizeButton = document.getElementById("minimize");
				//this._header = document.getElementsByClassName("app-header")[0];
				this._version = document.getElementById("version");
				// Inittialize
				this.init();
			}

			init () {
				//this._hideExitMinimizeModal();
				window.onclick = function (event) {
					var dynamicVoice = new Howl({
						src      : db.attack,
						preload  : false,
						autoplay : false,
						loop     : false,
						html5    : false,
						volume   : 1.0,
						onend    : function () {
							Howler.unload();
						},
					});
					if (event.target.innerText === "ATTACK") {
						let x = generateRandomNumber(db.attack.length);
						dynamicVoice._src = db.attack[x];
						dynamicVoice.load();
						dynamicVoice.play();
					} else if (event.target.innerText === "USE BANG") {
						let x = generateRandomNumber(db.bang.length);
						dynamicVoice._src = db.bang[x];

						dynamicVoice.load();
						dynamicVoice.play();
					} else if (event.target.innerText === "MOVING") {
						let x = generateRandomNumber(db.moving.length);
						dynamicVoice._src = db.moving[x];
						dynamicVoice.load();

						playDynamic();
					} else if (event.target.innerText === "COPY") {
						let x = generateRandomNumber(db.copy.length);
						dynamicVoice._src = db.copy[x];

						dynamicVoice.load();
						dynamicVoice.play();
					} else if (event.target.innerText === "HELP") {
						let x = generateRandomNumber(db.help.length);
						dynamicVoice._src = db.help[x];

						dynamicVoice.load();
						dynamicVoice.play();
					} else if (event.target.innerText === "COVER ME") {
						let x = generateRandomNumber(db.coverme.length);
						dynamicVoice._src = db.coverme[x];

						dynamicVoice.load();
						playDynamic();
					} else {
					}
				}.bind(this);
				// Enable dragging on this window
				// overwolf.windows.getCurrentWindow(result => {
				//   this.dragService = new DragService(result.window, this._header);
				// });
				// Display version

				overwolf.extensions.current.getManifest((manifest) => {
					if (!this._version) {
						return;
					}
					this._version.textContent = `Version ${manifest.meta.version}`;
				});
			}

			_showExitMinimizeModal () {
				this._modal.style.display = "block";
			}

			_hideExitMinimizeModal () {
				this._modal.style.display = "none";
			}
		}

		return SampleAppView;
	},
);
