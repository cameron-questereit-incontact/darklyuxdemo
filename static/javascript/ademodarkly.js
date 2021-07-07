function initializeClient() {
    var user = {
        "key": "UNIQUE IDENTIFIER"
    };
    var ldclient = LDClient.initialize('60e5b99d680b360cab480798', user);

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
    classCombination = "." + featureKey
    if (showFeature) {
        classCombination += ".toggled"
    } else {
        classCombination += ".untoggled"
    }
    $(classCombination).removeClass("hide")
}