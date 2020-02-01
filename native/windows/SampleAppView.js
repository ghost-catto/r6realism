define(
	[
		"../../lib/howler.min.js",
		"../../lib/howler.core.min.js",
		"../../lib/lodash.js",
	],
	function () {
		var db = {
			attack : [
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

			bang   : [
				"../../sound/bang/bang (1).wav",
				"../../sound/bang/bang (2).wav",
			],
			copy   : [
				"../../sound/copy/copy (2).wav",
				"../../sound/copy/copy (1).wav",
			],
			clear  : [
				"../../sound/clear/clear (1).wav",
				"../../sound/clear/clear (2).wav",
			],
		};

		var dynamicVoice = new Howl({
			src      : "../../sound/bang/A15O030W021.wav",
			preload  : false,
			autoplay : false,
			loop     : false,
			volume   : 1.0,
			onload   : function () {
				dynamicVoice.play();
			},
		});

		function generateRandomNumber (max) {
			return Math.floor(Math.random() * max);
		}

		function playDynamic () {
			dynamicVoice.load();
		}
		var throttle = _.throttle(playDynamic, 1200);
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
					if (event.target.innerText === "ATTACK") {
						let x = generateRandomNumber(db.attack.length - 1);
						dynamicVoice._src = db.attack[x];

						throttle();
					} else if (event.target.innerText === "USE BANG") {
						let x = generateRandomNumber(db.bang.length - 1);
						dynamicVoice._src = db.bang[x];

						throttle();
					} else if (event.target.innerText === "COPY") {
						let x = generateRandomNumber(db.copy.length - 1);
						dynamicVoice._src = db.copy[x];

						throttle();
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
