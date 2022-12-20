import { JSDOM } from "jsdom"
const dom = new JSDOM()

global.document = dom.window.document

const { window } = new JSDOM('', {
    url: "http://dummy.test/version"
});
delete global.window;
global.window = Object.create(window);



jest.spyOn(document, 'getElementById').mockImplementation(() =>
    ({
        addEventListener: () => {},
        classList: {
            add: () => {},
            contains: () => {},
            remove: () => {},
        }
    })
)