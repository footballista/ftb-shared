export class AbstractModel {
    map(model, customMappings) {
        if (!model)
            return;
        for (let key in model) {
            if ((model[key]) != null) {
                //filtering out null values
                if (customMappings[key]) {
                    customMappings[key](model);
                }
                else {
                    this[key] = model[key];
                }
            }
        }
        return this;
    }
    //receive object to store in DB
    compact() {
        const keys = Object.keys(this).filter(k => {
            if (k == 'customMappings')
                return false;
            return typeof this[k] != 'function';
        });
        let data = {};
        keys.forEach(k => {
            data[k] = this[k] && this[k].compact ? this[k].compact() : this[k];
        });
        return data;
    }
}
//# sourceMappingURL=abstract.model.js.map