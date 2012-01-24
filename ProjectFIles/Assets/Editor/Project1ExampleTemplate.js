
@MenuItem ("Assignment1/HelloWorld")
static function HelloWorld () {
	Debug.Log ("Hello World");
}

/**
 * Test functions for all the geometry rendering
 *
 */
@MenuItem ("Assignment1/Test Geometry")
static function TestAllGeometry() {

	//create little rows of geometric primitives
	var i : int;
	var g : GameObject;
	for(i = 0; i < 10; i++){
		g = GeometryHelper.CreateCube(Vector3(i*30,10,10), Vector3(10,4,6));
		g.name = "Cube " + i;
	}
	
	for(i = 0; i < 10; i++){
		g = GeometryHelper.CreateSphere(Vector3(i*30,20,10), Vector3(10,4,6));
		g.name = "Sphere " + i;
	}
	
	for(i = 0; i < 10; i++){
		g = GeometryHelper.CreateCapsule(Vector3(i*30,30,10), Vector3(10,4,6));
		g.name = "Capsule " + i;
	}

	for(i = 0; i < 10; i++){
		g = GeometryHelper.CreateCylinder(Vector3(i*30,40,10), Vector3(Random.Range(2,10),Random.Range(2,10),Random.Range(2,10)));
		g.name = "Cylinder " + i;
	}
	
	//light them
	for(i = 0; i < 10; i++){
		GeometryHelper.CreateSpotLight(Vector3(i*30,70,0), -Vector3.up, 100.0, 40.0, .03, Color(Random.Range(0,255),Random.Range(0,255),Random.Range(0,255)));
	}
	
	var redPlane = GeometryHelper.CreateVerticlePlaneAlongX(Vector3(-75, 0,0), 10, 10);
	var greenPlane = GeometryHelper.CreateHorizontalPlane(Vector3(-75, 0,0), 4, 10);
	var bluePlane = GeometryHelper.CreateVerticlePlaneAlongZ(Vector3(-75, 0,0), 4, 10);
	
	//You can also change the colors
	GeometryHelper.ApplyColor(redPlane, Color.red);
	GeometryHelper.ApplyColor(greenPlane, Color.green);
	GeometryHelper.ApplyColor(bluePlane, Color.blue);
		
	//test random geometry
	//this creates random triangles
	var triangleCenter = Vector3(-175,0,0);
	for(i = 0; i < 200; i++){
		GeometryHelper.CreatePoly(
			triangleCenter + Vector3(Random.Range(-25, 25), Random.Range(-50,50), Random.Range(-50,50)),
			triangleCenter + Vector3(Random.Range(-25, 25), Random.Range(-50,50), Random.Range(-50,50)),
			triangleCenter + Vector3(Random.Range(-25, 25), Random.Range(-50,50), Random.Range(-50,50))
		);
	}
	
	//light the triangles with random spot lights 

	for(i = 0; i < 10; i++){
		var position : Vector3 = triangleCenter + Random.onUnitSphere * 75;
		//point back to the center
		var direction = (triangleCenter - position ).normalized;
		//args to creat a point light are: position : Vector3, direction : Vector3, angle : float, intensity : float, color : Color
		GeometryHelper.CreateSpotLight(position, direction, 100.0, 40.0, 1, Color.white);
	}
	
}

@MenuItem ("Assignment1/Build My Memory")
static function BuildMemory() {
	//Fill this out
	
}