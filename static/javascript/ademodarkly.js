function initializeClient() {
    var user = {
        "firstName": "Bob",
        "lastName": "Loblaw",
        "key": "bob@example.com",
        "custom": {
            "groups": "beta_testers"
        }
    };
    var ldclient = LDClient.initialize('60e5b99d680b360cab480799', user);

    ldclient.on('ready', function () {
        console.log("It's now safe to request feature flags");
        toggleFeature(ldclient, "cam-is-really-the-best")
    });

    ldclient.on('change', function () {
        console.log("A flag configuration has changed")
        toggleFeature(ldclient, "cam-is-really-the-best")
    });
}

function toggleFeature(ldclient, featureKey) {
    var showFeature = ldclient.variation(featureKey, false);
    featureClass = "." + featureKey
    toggledClass = featureClass + ".toggled"
    untoggledClass = featureClass + ".untoggled"
    if (showFeature) {
        $(toggledClass).removeClass("hide")
        $(untoggledClass).addClass("hide")
    } else {
        $(untoggledClass).removeClass("hide")
        $(toggledClass).addClass("hide")
    }
}