import {data} from './datasource.js';

var items = new ej.data.DataManager(data);

var diagram = new ej.diagrams.Diagram({
  width: "1000px", height: "600px",
  dataSourceSettings: {
    // set the unique field from data source
    id: 'id',
    // set the field which is used to identify the reporting person
    parentId: 'manager',
    // define the employee data
    dataManager: items
  },
  layout: {
    // set the layout type
    type: 'OrganizationalChart',
  },
  getConnectorDefaults: connectorDefaults,
  setNodeTemplate: setNodeTemplate,
  // hide the gridlines in the diagram
  snapSettings: { constraints: ej.diagrams.SnapConstraints.None }
});
diagram.appendTo('#diagram');

//Define the common settings for connectors.
function connectorDefaults(connector) {
  connector.targetDecorator.shape = 'None';
  connector.type = 'Orthogonal';
  connector.style.strokeColor = 'gray';
  return connector;
}

//Funtion to add the Template of the Node.
function setNodeTemplate(obj, diagram) {
    // create the stack panel
    var content = new ej.diagrams.StackPanel();
    content.id = obj.id + '_outerstack';
    content.orientation = 'Horizontal';
    content.style.strokeColor = 'gray';
    content.padding = { left: 5, right: 10, top: 5, bottom: 5 };
  
    // create the image element to map the image data from the data source
    var image = new ej.diagrams.ImageElement();
    image.id = obj.id + '_pic';
    image.width = 50; image.height = 50; image.style.strokeColor = 'none';
    image.source = obj.data.imageUrl;
  
    // create the stack panel to append the text elements.
    var innerStack = new ej.diagrams.StackPanel();
    innerStack.style.strokeColor = 'none';
    innerStack.margin = { left: 5, right: 0, top: 0, bottom: 0 };
    innerStack.id = obj.id + '_innerstack';
  
    // create the text element to map the name data from the data source
    var text = new ej.diagrams.TextElement();
    text.style.bold = true;
    text.id = obj.id + '_name';
    text.content = obj.data.name;
  
    // create the text element to map the role data from the data source
    var desigText = new ej.diagrams.TextElement();
    desigText.id = obj.id + '_desig';
    desigText.content = obj.data.role;
  
    // append the text elements
    innerStack.children = [text, desigText];
    
    // append the image and inner stack elements
    content.children = [image, innerStack];
    return content;
}
