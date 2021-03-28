export default function uniqueCategories(array) {
    
    let flags = [], categories = [];
    for( let i = 0; i < array.length; i++) {
        if( flags[array[i].categories[0].name]) continue;
        flags[array[i].categories[0].name] = true;
        const obj = {id: array[i].categories[0].id, categoryName: array[i].categories[0].name, categoryIconPrefix: array[i].categories[0].icon.prefix, categoryIconSuffix: array[i].categories[0].icon.suffix}
        categories.push(obj);
    }
    return categories
}
