

function initEntityItemList()
{
	entityList = document.getElementById("entity-list");
	new Sortable(entityList, {
		animation: 150,
		ghostClass: 'blue-background-class'
	});
}

function initSceneItemList()
{
	sceneList = document.getElementById("scene-list");
	new Sortable(sceneList, {
		animation: 150,
		ghostClass: 'blue-background-class'
	});
}

function initComponentItemList()
{
	componentList = document.getElementById("component-list");
	new Sortable(componentList, {
		animation: 150,
		ghostClass: 'blue-background-class'
	});
}

function addSceneItem(id, name, img)
{
	image = img || "favicon.png"

	sceneList = document.getElementById("scene-list");
	scene = document.createElement("div");
	scene.id = id;
	scene.className = "list-group-item";
	scene.innerHTML = "<img src='"+image+"' width='30' height='30' alt='' class='d-inline-block align-center'><span style='padding-left:10px;' class='d-inline-block align-center'>"+name+"</span>";
	sceneList.appendChild(scene);
}

function addEntityItem(id, name , img)
{
	image = img || "favicon.png"

	entityList = document.getElementById("entity-list");
	entity = document.createElement("div");

	entity.id = id;
	entity.className = "list-group-item";
	entity.innerHTML = "<img src='"+image+"' width='30' height='30' alt='' class='d-inline-block align-center'><span style='padding-left:10px;' class='d-inline-block align-center'>"+name+"</span>";
	
	entityList.appendChild(entity);
}

function addComponentItem(id, name, img)
{
	image = img || "favicon.png"

	componentList = document.getElementById("component-list");
	component = document.createElement("div");
	component.id = id;
	component.className = "list-group-item";
	component.innerHTML = "<img src='"+image+"' width='30' height='30' alt='' class='d-inline-block align-center'><span style='padding-left:10px;' class='d-inline-block align-center'>"+name+"</span>";
	componentList.appendChild(component);
}




// Init sortable lists
initSceneItemList();
initEntityItemList();
initComponentItemList();

// Add some example entries
addSceneItem("scene1", "My Scene 1")
addSceneItem("scene2", "My Scene 2")
addSceneItem("scene3", "My Scene 3")
addSceneItem("scene4", "My Scene 4")

addEntityItem("entity1", "My Entity 1");
addEntityItem("entity2", "My Entity 2");
addEntityItem("entity3", "My Entity 3");
addEntityItem("entity4", "My Entity 4");
addEntityItem("entity5", "My Entity 5");
addEntityItem("entity6", "My Entity 6");
addEntityItem("entity7", "My Entity 7");

addComponentItem("component1", "My Component 1")
addComponentItem("component1", "My Component 2")
addComponentItem("component1", "My Component 3")
addComponentItem("component1", "My Component 4")
addComponentItem("component1", "My Component 5")