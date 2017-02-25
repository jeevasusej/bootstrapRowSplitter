/*! angular bootstrap row splitter v0.1
* 
* Copyright (c) 2017 Jeeva; Licensed MIT */
(function () {
    'use strict';
    angular.module('jjBootstrapRowSplitter', [])
	.directive('bootstrapRowSplitter', ['$window', function ($window) {
         return {
            restrict: 'AE',
            scope: {
                events: '=events',
                splitArray: '=splitArray',
                splitFirst: '=splitFirst',
                splitLast: '=splitLast',
                sharedValues: '=sharedValues',
                templateUrl: '@',
                options: '=options'
            },
            template: '<ng-include src="templateUrl"></ng-include>',
            link: function (scope, $element, attrs, ngModel) {
                /*
                 * Default sizes for the array split
                 */
                var medias = ['xs', 'sm', 'md', 'lg']
                , arraySplitCommon = {
                    windowResized: false
                }, mediaSizes = {
                    xs: 1, sm: 2, md: 3, lg: 4
                }, mediaClasses = {
                    xs: 'col-xs-', sm: 'col-sm-', md: 'col-md-', lg: 'col-lg-'
                }, detectedMedia = {
                    name: 'xs'
                };

                /*
                 * Media rules available in the bootstrap
                 * Mobile first method
                 */
                var mediaRules = {
                    lg: "(min-width: 1200px)",
                    md: "(min-width: 992px)",
                    sm: "(min-width: 768px)"
                };

                scope.values = scope.values || [];
                scope.events = scope.events || {};
                scope.options = scope.options || {};


                /*
               * To detect media change
               */

                if (scope.options.calculateOnResize) {
                    $(window).resize(function () {
                        arraySplitCommon.windowResized = true;
                        scope.events.splitArray();
                    });
                }

                /*
                 * Copy the user values
                 */
                mediaSizes = angular.copy(scope.options.mediaSizes);
              
                /*
                 * Item and class
                 */
                scope.splitItems = [];
                scope.splitItemsClasses = [];

                scope.splitClasses = [];
                scope.splitSize = scope.splitSize || 1;

                scope.options.splitSize = scope.options.splitSize || 1;
                scope.options.firstSplit = scope.options.firstSplit || -1;

                var newArr = [], classes = [], classIndex = 0;

                /*
                 * Event that is shared with the user
                 */
                scope.events.splitArray = splitArray;
                scope.events.checkMedia = checkMedia;

                function getTheMediaSize(name) {
                    var _size = null, _mIndex = null, _mediaClass = null;
                    _size = mediaSizes[name];
                    if (!_size) {
                        _mIndex = medias.indexOf(name);
                        for (_mIndex = _mIndex - 1; _mIndex > -1; _mIndex--) {
                            if (!_size) {
                                _size = mediaSizes[medias[_mIndex]];
                                _mediaClass = mediaClasses[medias[_mIndex]];
                            }
                        }
                    }
                    else
                        _mediaClass = mediaClasses[name];
                    if (!_size) {
                        _size = 1;
                        _mediaClass = mediaClasses[0]
                    }
                    return { size: _size, mediaClass: _mediaClass + (12 / _size) };
                }

                function splitArray() {
                    scope.splitItems = [], scope.splitItemsClasses = [];
                    newArr = [], classes = [], classIndex = 0;
                    var i = 0;;
                    if (scope.options.initializeValue) {
                        scope.values = scope.options.initializeValue();
                    }

                    if (scope.values) {
                        checkMedia();
                        var _bMedia = getTheMediaSize(detectedMedia.name);

                        scope.options.splitSize = _bMedia.size;

                        if (scope.options.splitSize <= 0)
                            scope.options.splitSize = 1;

                        scope.options.splitClasses = _bMedia.mediaClass;
                        
                        if (scope.options.firstSplitSizes) {
                            var _firstSplit = scope.options.firstSplitSizes[detectedMedia.name];
                            if (_firstSplit && _firstSplit > 0) {
                                newArr.push(scope.values.slice(i, i + _firstSplit));
                                i += _firstSplit;
                                var _firstMediaClass = mediaClasses[detectedMedia.name];
                                if (_firstMediaClass)
                                {
                                    _firstMediaClass=_firstMediaClass + (12 / _firstSplit)+" "+scope.options.firstSplitCustomClass;
                                    createClassArray(_firstMediaClass, _firstSplit);
                                }
                                    
                            }
                        }

                        for (; i < scope.values.length; i += scope.options.splitSize) {
                            newArr.push(scope.values.slice(i, i + scope.options.splitSize));
                            if (scope.options && scope.options.splitClasses)
                            {
                                scope.options.splitClasses=scope.options.splitClasses+" "+scope.options.arraySplitCustomClass;
                                createClassArray(scope.options.splitClasses, scope.options.splitSize);
                            }
                                
                        }
                    }
                    scope.splitItems = angular.copy(newArr);
                    scope.splitItemsClasses = angular.copy(classes);
                    
                    scope.splitterParentClass=[];
                    if(scope.options.splitterParentClass)
                    {
                        for(var i=0; i<scope.splitItems.length; i++)
                        {
                            scope.splitterParentClass[i]=scope.options.splitterParentClass;
                        }
                    }
                    
                    if (scope.options.calculateOnResize && arraySplitCommon.windowResized) {
                        scope.$apply();
                        arraySplitCommon.windowResized = false;
                    }
                }

                function addClassArray(classArray) {
                    classes[classIndex] = classArray;
                    classIndex += 1;
                }

                function createClassArray(classNames, size) {
                    var _classArrays = [];
                    for (var _i = 0; _i < size; _i++)
                        _classArrays[_i] = classNames;
                    addClassArray(_classArrays);
                    return _classArrays;
                }

                function checkMedia() {
                    var detected = false;
                    detectedMedia.name = "xs";
                    for (var k in mediaRules) {
                        if (!detected && $window.matchMedia(mediaRules[k]).matches) {
                            detectedMedia.name = k;
                            detected = true;
                        }
                    }
                }
                splitArray();
            }
        }
    }]);

}());
