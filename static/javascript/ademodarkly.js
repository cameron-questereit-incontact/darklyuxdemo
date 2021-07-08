function initializeClient() {
     var user = {
        "firstName": "Bob",
        "lastName": "Loblaw",
        "key": "bob@example.com",
        "custom": {
            "groups": "beta_testers"
        }
     };
    var ldclienttest = LDClient.initialize('60e5b99d680b360cab480798', user);

    ldclienttest.on('ready', function () {
        console.log("It's now safe to request feature flags");
        toggleFeature(ldclienttest, "cam-is-really-the-best", "test")
        toggleFeature(ldclienttest, "multi-contact-handling", "test")
        toggleFeature(ldclienttest, "entity-mode", "test")
        toggleFeature(ldclienttest, "entity-mode-outbound", "test")
    });

    ldclienttest.on('change', function(settings) {
        console.log("test change")
        toggleFeatureButtons(settings,"test")
    });


    var ldclientprod = LDClient.initialize('60e5b99d680b360cab480799', user);

    ldclientprod.on('ready', function () {
        console.log("It's now safe to request feature flags");
        toggleFeature(ldclientprod, "cam-is-really-the-best", "prod")
        toggleFeature(ldclientprod, "multi-contact-handling", "prod")
        toggleFeature(ldclientprod, "entity-mode", "prod")
        toggleFeature(ldclientprod, "entity-mode-outbound", "prod")
    });

    ldclientprod.on('change', function(settings) {
            toggleFeatureButtons(settings,"prod")
    });
}

function toggleFeature(ldclient, featureKey, env) {
    var showFeature = ldclient.variation(featureKey, false);
    console.log(featureKey + "-" + env)
    console.log(showFeature)
    if (showFeature) {
        var element = document.getElementById(featureKey + "-" + env)
        element.checked = true
    } else {
        var element = document.getElementById(featureKey + "-" + env)
        element.checked = false
    }
}

function toggleFeatureButtons(settings, env){
    for (const feature in settings){
        featureKey = feature
        featurevalue = settings[feature]["current"]
        console.log(featureKey + "-" + env)
        if(featurevalue){
        var element = document.getElementById(featureKey + "-" + env)
            element.checked = true
        } else{
            var element = document.getElementById(featureKey + "-" + env)
            element.checked = false
        }
    }
}