function initializeClient() {
     var user = {
        "key": "102",
        "custom": {
             "Groups": ["Central"],
             "Cluster": "DOA-C66COR01"
         },
     };
    var ldclienttest = LDClient.initialize('60e5b99d680b360cab480799', user);

    ldclienttest.on('ready', function () {
        console.log("It's now safe to request feature flags");
        toggleFeature(ldclienttest, "entity-mode", "test")
        toggleFeature(ldclienttest, "entity-mode-outbound", "test")
    });

    ldclienttest.on('change', function(settings) {
        console.log("102 change")
        console.log(settings)
        toggleFeatureButtons(settings,"test")
    });

    user = {
        "key": "100",
        "custom": {
            "Groups": ["Central"],
            "Cluster": "DOA-C66COR01"
        }
    };
    var ldclientprod = LDClient.initialize('60e5b99d680b360cab480799', user);

    ldclientprod.on('ready', function () {
        console.log("It's now safe to request feature flags");
        toggleFeature(ldclientprod, "entity-mode", "prod")
        toggleFeature(ldclientprod, "entity-mode-outbound", "prod")
    });

    ldclientprod.on('change', function(settings) {
            console.log("100 change")
            console.log(settings)
            toggleFeatureButtons(settings,"prod")
    });
}

function toggleFeature(ldclient, featureKey, env) {
    var showFeature = ldclient.variation(featureKey, false);
    if (showFeature) {
        var element = document.getElementById(featureKey + "-" + env)
        if(element != null) {
            element.checked = true
        }
    } else {
        var element = document.getElementById(featureKey + "-" + env)
        if(element != null) {
            element.checked = false
        }
    }
}

function toggleFeatureButtons(settings, env){
    for (const feature in settings){
        featurevalue = settings[feature]["current"]
        if(featurevalue){
        var element = document.getElementById(feature + "-" + env)
            if(element != null) {
                element.checked = true
            }
        } else{
            var element = document.getElementById(feature + "-" + env)
            if(element.checked  != null) {
                element.checked = false
            }
        }
    }
}