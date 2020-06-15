
/*RETURNS: comma separated string containing the values for object[name] for each object in the array
    Params: array: an array of objects
            name: a string representing the JSON name we want the values for 
*/
export function processObjectArray(array, name) {
    var string = ""

    array.forEach((value, index, array) => {
        if(index === 0)
            string = value[name];
        else 
            string = string + ", " + value[name];
    })

    return string;
}

//type: either "movie", "tv", or "person"
//subtype: either "cast" or "crew" -> otherwise returns null
//RETURN: array of objects with id, type, img_path, name, and subtext fields
export function processCreditsGallery(dataArray, type, subtype) {
    switch(type) {
        case "movie":
        case "tv":
            switch(subtype) {
                case "cast":
                    return dataArray.map((castMember, index) => {
                        var galleryObj = {};
                        galleryObj.id = castMember.id;
                        galleryObj.type = 'person';
                        galleryObj.img_path = castMember.profile_path;
                        galleryObj.name = castMember.name;
                        galleryObj.subtext = castMember.character;
                        return galleryObj;
                    });
                case "crew": 
                    return dataArray.map((crewMember, index) => {
                        var galleryObj = {};
                        galleryObj.id = crewMember.id;
                        galleryObj.type = 'person';
                        galleryObj.img_path = crewMember.profile_path;
                        galleryObj.name = crewMember.name;
                        galleryObj.subtext = crewMember.job;
                        return galleryObj;
                    });
                default: 
                    return null;
            }

        case "person":
            switch(subtype) {
                case "cast": 
                    return dataArray.map((castMedia, index) => {
                        var galleryObj = {};
                        galleryObj.id = castMedia.id;
                        galleryObj.type = castMedia.media_type;
                        galleryObj.img_path = castMedia.poster_path;
                        galleryObj.name = castMedia.title;
                        galleryObj.subtext = castMedia.character;
                        return galleryObj;
                    });
                case "crew": 
                    return dataArray.map((crewMedia, index) => {
                        var galleryObj = {};
                        galleryObj.id = crewMedia.id;
                        galleryObj.type = crewMedia.media_type;
                        galleryObj.img_path = crewMedia.poster_path;
                        galleryObj.name = crewMedia.title;
                        galleryObj.subtext = crewMedia.job;
                        return galleryObj;
                    });
                default: 
                    return null;
            }

        default:
            return null;

    }

}