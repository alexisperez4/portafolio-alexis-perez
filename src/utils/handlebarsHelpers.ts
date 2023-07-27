import Handlebars from 'handlebars';

Handlebars.registerHelper('if_eq', function(a: any, b: any, opts: any) {
    if (a === b) {
        return opts.fn();
    } else {
        return opts.inverse();
    }
});
