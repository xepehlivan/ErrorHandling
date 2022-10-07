onSaveIntentory: function() {
			var that = this;
			var sRequest = {
				"Detail": 'Save',
				"Context": JSON.stringify({
					Header: sap.ui.getCore().getModel("DetailModel").getData(),
					Items: this.getView().getModel("ItemsModel").getData()
				})
			};

			var oErrorHandler = this.getOwnerComponent()._oErrorHandler;
			this.getView().setBusy(true);
			this.getView().getModel().create("/OperationSet", sRequest, {
				success: function(oData, oResponse) {
					this.getView().setBusy(false);
					var aMessage = [];
					var hdrMessage = oResponse.headers["sap-message"];
					if (hdrMessage !== undefined) {
						var hdrMessageObject = JSON.parse(hdrMessage);
						if (hdrMessageObject.details.length >= 1) {
							aMessage.push({
								message: hdrMessageObject.message,
								type: this.onConvertSeverityName(hdrMessageObject.severity)
							});
							oErrorHandler._displayMessages(aMessage.concat(hdrMessageObject.details));
							return;
						} else {
							if (hdrMessageObject.message !== "") {
								aMessage.push({
									message: hdrMessageObject.message,
									type: this.onConvertSeverityName(hdrMessageObject.severity)
								});
								oErrorHandler._displaySingleMessage(aMessage);
								return;
							}
						}
					}
				}.bind(this),
				error: function(oData, oResponse) {
					this.getView().setBusy(false);
				}.bind(this)
			});
},
onConvertSeverityName: function(severity) {
			switch (severity) {
				case 'error':
					return 'Error';
				case 'warning':
					return 'Warning';
				case 'success':
					return 'Success';
			}
}
