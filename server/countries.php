<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Expose-Headers: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');


// Thanks to Stephen Burgess for the orignal file, which has been modified per below.
// https://github.com/stephenburgess8/countries/blob/master/src/countries.php

// Main
// session_start();

// set to the user defined error handler
// set_error_handler("customError",E_ALL);

$debug1 = TRUE;  // If set to TRUE we will print debug messages to the log

$callapi = FALSE;  // If set to FALSE we will use SESSION info for API and not call API each time

    // Make sure the $_SESSION[countries] array is filled with the serializd list of all counties from previous call

    // to the restcountries.eu API, else call the API and fill $_SESSION['countries']

     if ($debug1 == TRUE) {
        error_log("Entered countries.php, debug is set to ON", 0);
         } else {
        error_log("Entered countries.php, debug is set to OFF", 0);
     }

     if ($callapi == TRUE) {
        error_log("Entered countries.php, api call each time is set to YES", 0);
        } else {
        error_log("Entered countries.php, api call each time is set to NO", 0);
     }

     error_log("Front end request method follows:", 0);

     error_log($_SERVER["REQUEST_METHOD"], 0);

     // Beginning of main loop. Either search a previusly filled ou contries array or get it and fill it up.

    if (isset($_SESSION['countries']) and ($callapi == FALSE)) {
        if ($debug1 == TRUE) {
            error_log("countries.php: $SESSION isset is TRUE, $_SESSION countries sizeof() is:", 0);

            error_log(sizeof($_SESSION['countries'], 0)); // See https://www.php.net/manual/en/function.isset.php for isset 

         }                                                         // See https://www.php.net/manual/en/function.session-start.php               

                                                                   // See https://www.w3schools.com/php/php_sessions.asp for $_SESSION

        $countries = unserialize($_SESSION['countries']); 

                                                            // See https://www.w3resource.com/php/function-reference/unserialize.php

                                                            // And great explanation of serialize / unserialize is here https://www.geeksforgeeks.org/serialize-deserialize-array-string/

        } else {

        $response = getCountriesResponse($debug1);                 // Sets variable response via getCountriesResponse() function below

        $formattedCountries = formatCountries($response);   // Sets variable via formatCountries() function below

        $_SESSION['countries'] = serialize($formattedCountries); // sets session array variable with serialized formattedCountries variable

        if ($debug1 == TRUE) {
        error_log("countries.php: In getCountriesResponse and just set SESSION countries", 0);
        }
        $countries = $formattedCountries;                   // And finally, set countries variable for searching
    }

    // Now set $search to the search input that the front end passed us ($_GET gets input passed  by front end)

    error_log("Input passed from front end:", 0);

    $search = file_get_contents('php://input');

    error_log($search, 0);

    if ($debug1 == TRUE) {

        error_log("countries.php: Input string we will search for:", 0);

        error_log($search, 0);
    }                               

    // Fill up the requested countries into $results

    // $search has the countries the front end told us to search for,

    //     and $countries has an unserialized list of all countries from our call to the restcountries.eu API

    $results = getCountriesByInput($search, $countries, $debug1);    // Call function below

    if ($debug1 == TRUE) {
        error_log("countries.php: Results of search", 0);

        error_log(json_encode($results), 0);
    } 

    echo $_GET['callback'] . '('.html_entity_decode(json_encode($results)).')';  // Send sorted results back to calling front-end app

    // End Main

 
    // This function is called to search through the array of all countries and codes,

    // with the front end app's country input, and if the country input matches a country as we move thrugh the array,

    // that country (and its region and subregion) are pushed onto the $countries array

    function getCountriesByInput($search, $allCountries, $debug1) {
        $countries = [];                                    // Define arrays and a numeric variable

        $regions = [];

        $subregions = [];

        $count = 0;

        foreach ($allCountries as $country) {       // See https://stackoverflow.com/questions/5720260/as-operator-in-php
            $countryMatchesSearchInput = false;     // Set boolean value

            $searchFields = [                       // Define array of search elements. This array will hold country names and codes.

                strtolower($country['name']),       // Country name in our array

                strtolower($country['alphaCode2']),

                strtolower($country['alphaCode3'])
            ];

            // For loop that searches for matches with country or country code that the user entered

            foreach ($searchFields as $countryProperty) {                     
                 if (strpos($countryProperty, strtolower($search)) !== false) {  // strpos finds the position of the first occurrence of a substring in a string

                                                                                // strlower makes a string lowercase

                    $countryMatchesSearchInput = true;                          // Set boolean to true if we get a match
                }
            }

            if ($countryMatchesSearchInput) {                                    // We've found a match!
                $count++;                                                       // Increment country match count

                array_push($countries, $country);                               // array_push pushes one or more elements onto the end of array

                $regionIsPresent = strlen($country['region']) > 0;              // strlen is just length of string

                if($regionIsPresent && !in_array($country['region'], $regions)) { // Also push region onto array
                    array_push($regions, $country['region']);  
                }

                $subregionIsPresent = strlen($country['subregion']) > 0;

                if($subregionIsPresent && !in_array($country['subregion'], $subregions)) {
                    array_push($subregions, $country['subregion']);
                }
            }

            // The insructions said we should stop at 50 matches

            if ($count == 50) {
                break;
            }
        }

        usort($countries, function($a, $b) {          // usort sorts an array by values using your user-defined comparison function
            return $a['name'] <=> $b['name'];

            // The <=> is the PHP "spaceship" operator

            // Returns 0 if values on either side are equal

            // Returns 1 if the value on the left is greater

            // Returns -1 if the value on the right is greater                      
        });

        sort($regions);     // sort the array, lowest to highest

        sort($subregions);  // sort the array, lowest to highest

 
        $results = array(   // creates an array and populates the variable results with the array values
            'search' => $search,

            'countries' => $countries,

            'regions' => $regions,

            'subregions' => $subregions
        );


        if ($debug1 == TRUE) {

        if ($count == 0) {
            error_log("countries.php: Country search returned no results", 0);
        } else {
            error_log("countries.php: Country search found one or more countries", 0);
            }
         }

        return $results;    // return list of matched countries and regions to caller
    }

 

    // This function gets all countries and country codes from the restcountries.eu API and puts all of them into $response

    function getCountriesResponse($debug1) {
         if ($debug1 == TRUE) {
            error_log("countries.php: Entered getCountriesResponse", 0);
         }

        $curl = curl_init();

        if ($debug1 == TRUE) {
        if ($curl != 0) {
            error_log("countries.php: Curl init success in getCountriesResponse", 0);
        } else {
            error_log("countries.php: Curl init error in getCountriesResponse", 0);
            }
        }

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://restcountries.eu/rest/v2/all",

            CURLOPT_RETURNTRANSFER => true,

            CURLOPT_TIMEOUT => 30,

            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,

            CURLOPT_CUSTOMREQUEST => "GET",

            CURLOPT_HTTPHEADER => array(

            "cache-control: no-cache"
            ),
        ));

        $response = curl_exec($curl);   // Call the rescountries.eu API with curl

        $err = curl_error($curl);      

        curl_close($curl);

        return json_decode($response, true);    // And return $response and "true" to caller.

                                                // json_decode is a PHP function that takes a JSON encoded string and converts it into a PHP variable.
    }

    // This formats the $countries array with the country elements
    function formatCountries($response) {
        $countries = [];

        foreach ($response as $country) {
            $formattedCountry = array(

                "name" => $country["name"],

                "alphaCode2" => $country["alpha2Code"],

                "alphaCode3" => $country["alpha3Code"],

                "flag" => $country["flag"],

                "population" => $country["population"],

                "region" => $country["region"],

                "subregion" => $country["subregion"]
            );

            $formattedCountry = array_map('htmlentities', $formattedCountry);

            $languages = [];
            foreach ($country["languages"] as $language) {
                array_push($languages, $language["name"]);
            }

            $languages = array_map('htmlentities', $languages);

            $formattedCountry['languages'] = $languages;

            array_push($countries, $formattedCountry);
        }

        return $countries;
    }

    function customError($errno, $errstr, $errfile, $errline)  {
        $abc = "Look - Error number $errno at line $errline error text is $errstr";

        error_log($abc);

        error_log("In error handler", 0);
      }

?>