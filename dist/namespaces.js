"use strict";
var FormNameSpace;
(function (FormNameSpace) {
    class MyForm {
        constructor(email) {
            this.email = email;
            this.type = 'inline';
            this.state = 'active';
        }
        getInfo() {
            return {
                type: this.type,
                state: this.state
            };
        }
    }
    FormNameSpace.form2 = new MyForm('test@mail.ru');
})(FormNameSpace || (FormNameSpace = {}));
console.log(FormNameSpace.form2);
//# sourceMappingURL=namespaces.js.map