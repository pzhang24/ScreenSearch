
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
//itemtype: type of item being displayed in the gallery, either "movie", "tv", or "person"
//RETURN: array of objects with (not null) id, (not null) type, img_path, (not null) name, and subtext fields
export function processCreditsGallery(dataArray, infotype, subtype, itemtype) {
    switch(infotype) {
        case "movie":
        case "tv":
            switch(subtype) {
                case "cast":
                    return dataArray.map((castMember, index) => {
                        var galleryObj = {};
                        galleryObj.id = castMember.id;
                        galleryObj.type = itemtype;
                        galleryObj.img_path = castMember.profile_path;
                        galleryObj.name = castMember.name || "Unknown";
                        galleryObj.subtext = castMember.character || "N/A";
                        return galleryObj;
                    });
                case "crew": 
                    return dataArray.map((crewMember, index) => {
                        var galleryObj = {};
                        galleryObj.id = crewMember.id;
                        galleryObj.type = itemtype;
                        galleryObj.img_path = crewMember.profile_path;
                        galleryObj.name = crewMember.name || "Unknown";
                        galleryObj.subtext = crewMember.job || "N/A";
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
                        galleryObj.type = castMedia.media_type || itemtype;
                        galleryObj.img_path = castMedia.poster_path;
                        galleryObj.name = castMedia.title || castMedia.name || "Unknown";
                        galleryObj.subtext = castMedia.character || "N/A";
                        return galleryObj;
                    });
                case "crew": 
                    return dataArray.map((crewMedia, index) => {
                        var galleryObj = {};
                        galleryObj.id = crewMedia.id;
                        galleryObj.type = crewMedia.media_type || itemtype;
                        galleryObj.img_path = crewMedia.poster_path;
                        galleryObj.name = crewMedia.title || crewMedia.name || "Unknown";
                        galleryObj.subtext = crewMedia.job || "N/A";
                        return galleryObj;
                    });
                default: 
                    return null;
            }

        default:
            return null;

    }

}

export function processRecommendedGallery(dataArray, recommendedType) {
    return dataArray.map((result, index) => {
        var galleryObj = {};
        galleryObj.id = result.id;
        galleryObj.type = recommendedType;
        galleryObj.img_path = result.poster_path;
        galleryObj.name = result.title || result.name || "Unknown";
        
        const movie_release_year = result.release_date ? result.release_date.slice(0, 4) : null;
        const tv_first_air_year = result.first_air_date ? result.first_air_date.slice(0, 4) : null;
        galleryObj.subtext = movie_release_year || `First Aired: ${tv_first_air_year}` || null;

        return galleryObj;
    })
}