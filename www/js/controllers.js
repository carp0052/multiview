angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, LocalStorageService) {

        //// Create the settings modal ////
        $ionicModal.fromTemplateUrl('templates/settings.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        })

        //// Open the settings modal ////
        $scope.settings = function () {
            $scope.modal.show();
        };

        //vibration alert to local storage
        if (LocalStorageService.getStorageList("vibration")) {
            $scope.vibration = LocalStorageService.getStorageList("vibration");
        } else {
            $scope.vibration = {
                checked: true
            };
            LocalStorageService.setStorageList("vibration", $scope.vibration);
        };
        //end of vibration alert to local storage

        //when vibration alert is toggled, set local storage
        $scope.enableVibration = function () {
                LocalStorageService.setStorageList("vibration", $scope.vibration);
            }
            //end of vibration alert toggled

        //notification alert to local storage
        if (LocalStorageService.getStorageList("notification")) {
            $scope.notification = LocalStorageService.getStorageList("notification");
        } else {
            $scope.notification = {
                checked: true
            };
            LocalStorageService.setStorageList("notification", $scope.notification);
        };
        //end of notification alert to local storage

        //when notification alert is toggled, set local storage
        $scope.enableNotification = function () {
                LocalStorageService.setStorageList("notification", $scope.notification);
            }
            //end of notification alert toggled

        // Triggered in the settings modal to close it
        $scope.closeSettings = function () {
            $scope.modal.hide();
        };
    })
    //end of App controller

//// To Do List Controller ////
.controller('ToDoCtrl', function ($scope, LocalStorageService, $cordovaVibration, $cordovaLocalNotification) {

        //check local storage for tasks list 
        if (LocalStorageService.getStorageList("tasks")) {
            //if it is in local storage, get the list
            $scope.tasks = LocalStorageService.getStorageList("tasks");
        } else {
            //if it's not in local storage, create list
            $scope.tasks = [{
                taskName: "Add your tasks",
                checked: false
        }];
            //add newly created list to local storage
            LocalStorageService.setStorageList("tasks", $scope.tasks);
        }
        //end check for local storage

        //// Check for Vibration Alerts and Notification Alerts ////
        $scope.checkAlerts = function (index) {

                //// Vibration Check ////
                //if the task is checked & vibration alert is on...
                if ($scope.tasks[index].checked && $scope.vibration.checked) {
                    //alert("task complete")
                    $cordovaVibration.vibrate(500);
                }
                //end vibration check

                //// Notification Check ////
                var checkCount = 0;
                //for each task in list...
                angular.forEach($scope.tasks, function (task) {
                    //if task is checked, add 1 to counter
                    if (task.checked) checkCount++;
                });

                //if the counter equals the # of tasks in the list & notification alert is on...
                if (checkCount === $scope.tasks.length && $scope.notification.checked) {
                    // alert("all complete!");

                    $cordovaLocalNotification.add({
                        id: 1,
                        title: 'CONGRATULATIONS!',
                        text: 'You have completed all of your tasks!'
                    });

                }; //end notification check  
            }
            //end check for Alerts

        //// Send Task Function ////
        $scope.sendTask = function () {

                //if statement to make sure input box is not empty when add button is clicked
                if ($scope.todoTask) {
                    //add task to list, set checked to false 
                    $scope.tasks.push({
                        taskName: $scope.todoTask,
                        checked: false
                    });

                    //add to localStorageService
                    LocalStorageService.setStorageList("tasks", $scope.tasks);

                    //clear input text after item has been added to list 
                    $scope.todoTask = "";
                }
            }
            //end sendTask function

        // Remove Task Function - only remove tasks that have been completed //
        $scope.removeTask = function () {
            //for each task on the list
            angular.forEach($scope.tasks, function (task, $index) {

                //if task is checked (i.e. complete)
                if (task.checked) {
                    //remove the task from list
                    $scope.tasks.splice($index, 1); //removes from local storage completely
                }
            });
        };
        //end removeTask function

    })
    //end To Do List Controller

//// Grocery List Controller ////
.controller('GroceryCtrl', function ($scope, LocalStorageService, $cordovaVibration, $cordovaLocalNotification) {
        //check local storage for grocery list 
        if (LocalStorageService.getStorageList("items")) {
            //if it is in local storage, get the list
            $scope.items = LocalStorageService.getStorageList("items");
        } else {
            //if it's not in local storage, create list
            $scope.items = [{
                itemName: "Add grocery items",
                checked: false
        }];
            //add newly created list to local storage
            LocalStorageService.setStorageList("items", $scope.items);
        }
        // end local storage check

        //// Check for Vibration Alerts and Notification Alerts ////
        $scope.checkAlerts = function (index) {

                //// Vibration Check ////
                //if the item is checked & vibration alert is on...
                if ($scope.items[index].checked && $scope.vibration.checked) {
                    //alert("task complete")
                    $cordovaVibration.vibrate(500);
                }
                //end vibration check

                //// Notification Check ////
                var checkCount = 0;
                //for each item in list...
                angular.forEach($scope.items, function (item) {
                    //if item is checked, add 1 to counter
                    if (item.checked) checkCount++;
                });

                //if the counter equals the # of items in the list & notification alert is on...
                if (checkCount === $scope.items.length && $scope.notification.checked) {
                    //alert("all complete!");

                    $cordovaLocalNotification.add({
                        id: 1,
                        title: 'CONGRATULATIONS!',
                        text: 'You have got all of your grocery items!'
                    });

                }; //end notification check  
            }
            //end check for Alerts

        //// Send Item Function ////
        $scope.sendItem = function () {

                //if statement to make sure input box is not empty when add button is clicked
                if ($scope.groceryItem) {
                    //add item to list, set checked to false  
                    $scope.items.push({
                        itemName: $scope.groceryItem,
                        checked: false
                    });

                    //add to localStorageService
                    LocalStorageService.setStorageList("items", $scope.items);

                    //clear input text after item has been added to list 
                    $scope.groceryItem = "";
                }
            }
            //end sendItem function

        // Remove Item Function - only remove items that have been completed //
        $scope.removeItem = function () {

            //for each item on the list
            angular.forEach($scope.items, function (item, $index) {
                //if item is checked (i.e. complete)
                if (item.checked) {
                    //remove the item from list
                    $scope.items.splice($index,1); //removes from local storage completely
                }
            });
        };
        //end removeTask function

    })
    //end Grocery List Controller

//// Gift List Controller ////
.controller('GiftCtrl', function ($scope, LocalStorageService, $cordovaVibration, $cordovaLocalNotification) {

    //check local storage for gift list 
    if (LocalStorageService.getStorageList("gifts")) {
        //if it is in local storage, get the list
        $scope.gifts = LocalStorageService.getStorageList("gifts");
    } else {
        //if it's not in local storage, create list
        $scope.gifts = [{
            giftName: "Add gift ideas",
            checked: false
        }];
        //add newly created list to local storage
        LocalStorageService.setStorageList("gifts", $scope.gifts);
    } // end local storage check

    //// Check for Vibration Alerts and Notification Alerts ////
    $scope.checkAlerts = function (index) {

            //// Vibration Check ////
            //if the gift is checked & vibration alert is on...
            if ($scope.gifts[index].checked && $scope.vibration.checked) {
                //alert("task complete")
                $cordovaVibration.vibrate(500);
            }
            //end vibration check

            //// Notification Check ////
            var checkCount = 0;
            //for each gift in list...
            angular.forEach($scope.gifts, function (gift) {
                //if gift is checked, add 1 to counter
                if (gift.checked) checkCount++;
            });

            //if the counter equals the # of gifts in the list & notification alert is on...
            if (checkCount === $scope.gifts.length && $scope.notification.checked) {
                // alert("all complete!");

                $cordovaLocalNotification.add({
                    id: 1,
                    title: 'CONGRATULATIONS!',
                    text: 'You have got all items on your gift list!'
                });

            }; //end notification check  
        } //end check for Alerts

    //// Send Gift Function ////
    $scope.sendGift = function () {

            //if statement to make sure input box is not empty when add button is clicked
            if ($scope.giftList) {
                //add gift to list, set checked to false 
                $scope.gifts.push({
                    giftName: $scope.giftList,
                    checked: false
                });

                //add to localStorageService
                LocalStorageService.setStorageList("gifts", $scope.gifts);

                //clear input text after item has been added to list 
                $scope.giftList = "";
            }
        }
        //end sendGift function

    // Remove Gift Function - only remove gifts that have been completed //
    $scope.removeGift = function () {

        //for each gift on the list
        angular.forEach($scope.gifts, function (gift, $index) {
            //if gift is checked (i.e. complete)
            if (gift.checked) {
                //remove the item from list
                $scope.gifts.splice($index,1); //removes from local storage completely
            }
        });
    };
    //end removeTask function

});
//end Gift List Controller