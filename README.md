# BootstrapRowSplitter
Add bootstrap row while using ng-repeat.

When we want to add bootrap columns in different hights, then the rows will collapse.
So in that case we need to add the needed columns for every row.
So that the columns will not columns will not collapse.

This works based on the bootstrap 3.3.7 based media queries.

#<a href="https://jeevasusej.github.io/bootstrapRowSplitter" target="_blank"> Demo and Documentation</a>
#Configuration and options

* bootstrap-row-splitter  :    Directive to be included in your html

* shared-values           :   That is shared to the directive from the controller
* options                 :   Options for the directive
* events                  :   Events that is shared from the directive to the controller.
* template-url            :   Template that should be passed to show the data using ng-repeat
* Options                 :   Options - This is a object with the following properties

#Options
* calculateOnResize       :   This is to recalculate the split array on window resize (Default is false)
* initializeValue         :   This is mandatory function for this directive This is the function used to initialize the value. This is usually used to do manipulation before spliting the array.

* firstSplitSizes         :   This is the optional object. No of columns for the first row. This should mentioned with the properties as {lg: 3, md:2,sm:3,xs:2} like that.

* mediaSizes              :   Mandatory object No of columns for the bootstrap rows. This should mentioned with the properties as {lg: 3, md:2,sm:3,xs:2} like that. If we missed to mention lg, then md size will be taken. If we missed to mention md, then sm size will be taken. If nothing has been mentioned, then size will be 1.
* firstSplitCustomClass   :   Custom class for the first row coulmns.
* arraySplitCustomClass   :   Custom class for the row columns
* splitterParentClass     :   custom class for the row

#Events
Events - This is the object shared from directive to controller.

* splitArray              :   Sometimes the directive will be initialized before we get the data from the server. To split the array manually, call the following function from the controller. splitArray()
* checkMedia              :   To check the media (Bootstrap media.). The following bootstrap media has been used. lg: "(min-width: 1200px)" - md: "(min-width: 992px)"  - sm: "(min-width: 768px)"
