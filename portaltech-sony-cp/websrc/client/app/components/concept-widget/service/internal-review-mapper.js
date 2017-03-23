angular.module('conceptWidget').service('conceptWidgetServiceInternalReviewObjects', 
function conceptWidgetServiceInternalReviewObjects(conceptWidgetServiceCore, conceptCommonServiceField) {

    //// This is the mapper function to put the font awson icons 
    /// manually for the rating radio buttons

	function ratingsMapper(fields) {            
            var ratingsArray = [];
            angular.forEach(fields.list(), function(field) {               

                ratingsObject = {};
                switch(field.value) {
                    case 'ACCLAIMED':
                            ratingsObject.label = field.label;
                            ratingsObject.value = field.value;
                            ratingsObject.cssClass = "fa fa-adn";
                            ratingsArray.push(ratingsObject);

                            break;

                    case 'FAVOURABLE':
                            ratingsObject.label = field.label;
                            ratingsObject.value = field.value;
                            ratingsObject.cssClass = "fa fa-smile-o";
                            ratingsArray.push(ratingsObject);

                            break;

                    case 'AVERAGE':
                            ratingsObject.label = field.label;
                            ratingsObject.value = field.value;
                            ratingsObject.cssClass = "fa fa-meh-o";
                            ratingsArray.push(ratingsObject);

                            break;

                    case 'UNFAVOURABLE':
                            ratingsObject.label = field.label;
                            ratingsObject.value = field.value;
                            ratingsObject.cssClass = "fa fa-frown-o";
                            ratingsArray.push(ratingsObject);

                            break;

                    case 'DISLIKED':
                            ratingsObject.label = field.label;
                            ratingsObject.value = field.value;
                            ratingsObject.cssClass = "fa fa-thumbs-o-down";
                            ratingsArray.push(ratingsObject);

                            break;
                };
            });         

            return ratingsArray;
        }; 

    /// To generate the controls on the form, we need to create manual fields here
    /// Prep-populate them if they got values    

    this.internalReviewFields = function(feedbackObject) {

            this.fields = [
                {
                    name: 'concept.overview.internalReview',
                    config: 'conceptRatings'
                }].map(function fieldsMap(obj) {
                    var map = {
                        radio: {
                            name: obj.name + '.Rating',
                            config: conceptWidgetServiceCore[obj.config],
                            ratings : ratingsMapper(conceptWidgetServiceCore[obj.config])
                        },
                        comment: {
                            name: obj.name + '.Comment'
                        }
                    };
                    [
                        'radio',
                        'comment',               
                    ].forEach(function forEach(prop) { 
                        map[prop].model = conceptCommonServiceField.field(map[prop].name);                
                        switch(prop) {
                            
                            case 'radio':
                                if((feedbackObject) && (feedbackObject.rating)) {
                                    map[prop].model.value(feedbackObject.rating);
                                }                        
                                break;
                            case 'comment':
                                if((feedbackObject) && (feedbackObject.comment)) {
                                    map[prop].model.value(feedbackObject.comment);
                                }                        
                                break;
                        }                
                    }); 
                    return map;
                }); 

                return this.fields;
        };

        

});