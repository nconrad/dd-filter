# dd-filter

angular.js dropdown directive with filter


## Basic Usage

Tested with Angular 1.3+ and Bootstrap 3.0+

1) Include dd-filter.js, dd-filter.css, and make `dd-filter` an angular dependency
```
angular.module('MyApp', ['ui.router', 'dd-filter', ... ])
.config( ... )
```

2) Add a dd-filter to your template
```
    <dd-filter
         dd-data="myData"
         dd-title="Title above search box"
         dd-placeholder="Type something..."
         ng-model="selectedItem">
    </dd-filter>
```

3) Writing something similar to the following in your controller
   will automatically update the dropdown and default selection

```
    $http.get('some/data/path')
         .then(function(myData) {
             $scope.myData = myData;
             $scope.selectedItem = myData[0]; // use first item default
         })
```

Note: myData should be an object of the form
```
    [{name: 'foo', ... }, {name: 'bar', ... }, ... , {name: 'example', ... }]
```


## Options


Attribute       | What it does..                                                         | Watched?
--------------- | ---------------------------------------------------------------------- | ------------
dd-filter       | Invokes directive                                                      |
dd-id           | Sets DOM id for dropdown (string)                                      |
dd-title        | Sets title inside of dropdown (string)                                 |
dd-placeholder  | Sets filter placeholder text (string)                                  |
dd-data         | Sets data to be used in dropdown                                       | Yes
ng-model        | Sets angular model for selected item                                   | Yes
dd-required     | Evaluated to determine if ng-required should be used                   |
dd-change       | Optional event string to be used when change event is emited (string)  |
dd-empty-notice | Optional string for when there's nothing in the dropdown (string)      |
dd-class        | Adds additional classes to button class (string)                       |



## Why?

- Interaction/design inspired by Github's filterable dropdown menus.
- dd-filter is made for angular, is lightweight, and serves one purpose.
- Simple, easy to use, and fun!


## Contributing

Create an issue, or

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request


## Author(s)

Neal Conrad <nconrad@anl.gov>


## License

Released under [the MIT license](https://github.com/nconrad/dd-filter/blob/master/LICENSE).

