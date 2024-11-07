// Entry point of the dashboard.
function OnNewDashboard(dashboard) {

    const shellFrame = dashboard.ShellFrame;
    const shellListing = shellFrame.ActiveListing;
    
    /**
     * Calls getLink for a given ObjectVersionEx
     * @param {any} objectVersionEx
     * @returns {Promise} - promise resolves to string URL
     */
	function getLink(objectVersionEx) {
		if (objectVersionEx)
			return MFiles.GetWebLink(
				objectVersionEx.object_info.obj_id,
				objectVersionEx.object_info.guid, /* objGUID */
				"", /* fileGUID */
				"", /* fileID */
				false, /* isLatestVersion */
				objectVersionEx.version_info.version.internal_version, /* version */
				{ itemType: "" },	// dummy viewInfo to avoid exception (please fix)
				"", /* externalID */
			);
	}

    console.log("OnNewDashboard");
    // Some things are ready only after the dashboard has started.
    dashboard.Events.Register(MFiles.Event.Started, OnStarted);


    function OnStarted() {
        var objectVersion;
        var selectedItems = shellListing?.CurrentSelection;
        var objVersions = selectedItems?.ObjectVersions;

        if (objVersions) {
			// get the object version of selected object
            console.log("objVersions.len=" + objVersions.length);
            if (objVersions.length == 1) {
                objectVersion = objVersions[0];
                console.log("objVersion Type=" + objectVersion.object_info.obj_id.type + " internal ID=" + objectVersion.object_info.obj_id.item_id.internal_id + " v " + objectVersion.version_info.version.internal_version);

                console.log(objectVersion.version_info?.title);

                document.getElementById("obj-id").innerHTML = "object type=" + objectVersion.object_info.obj_id.type + " internal ID=" + objectVersion.object_info.obj_id.item_id.internal_id + " v " + objectVersion.version_info.version.internal_version;

                // call GetWebLink and set the returned URL to HREFs:
                getLink(objectVersion).then(URL => {
                    // Set the HREF attribute of both A links:
                    document.getElementById("link-a1").setAttribute("href", URL);
                    document.getElementById("link-a2").setAttribute("href", URL);
                });

                // Attach event listener to SPAN
                // Will dynamically call MFiles.GetWebLink() and then MFiles.OpenExternalWebLink()
                document.getElementById("link-span").addEventListener("mousedown", ev => {
                    console.log("mousedown");

                    getLink(objectVersion).then(URL => {
                        console.log("URL = " + URL);
                        MFiles.OpenExternalWebLink(URL);
                    });
                });
            } else {
                console.log("You didn't select exactly one object.");
                document.getElementById("obj-id").innerHTML = "You didn't select exactly one object."
            }
        }
    }
}