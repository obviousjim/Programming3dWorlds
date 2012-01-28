
@MenuItem ("Assignment1/HelloWorld")
static function HelloWorld () {
	Debug.Log ("Hello World");
}

/**
 * Test functions for all the geometry rendering
 *
 */
@MenuItem ("Assignment1/Build Primitives")
static function BuildPrimitives(){
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
		GeometryHelper.CreateSpotLight(Vector3(i*30,70,0), -Vector3.up, 100.0, 40.0, 5.6, Color(Random.Range(0,1.0),Random.Range(0,1.0),Random.Range(0,1.0)));
	}
}

@MenuItem ("Assignment1/Build Cylinder Ring")
static function BuildCylinderRing(){
	var cylinder : GameObject;
	for(var i = 0; i < 50; i++){
		var degrees : float = 360 * i / 50.0;
		var distance : float = 50;
		var pos : Vector3 = Vector3(Mathf.Cos(degrees * Mathf.Deg2Rad), 0, Mathf.Sin(degrees * Mathf.Deg2Rad) ) * distance;
		cylinder = GeometryHelper.CreateCylinder(pos, Vector3(1,1,1));
		cylinder.transform.rotation.eulerAngles = Vector3(90,-degrees + 90,0);		
	}
}

@MenuItem ("Assignment1/Build Colored Planes")
static function BuildColoredPlanes(){
	var redPlane = GeometryHelper.CreateVerticalPlaneAlongX(Vector3(-75, 0,0), 10, 10);
	var greenPlane = GeometryHelper.CreateHorizontalPlane(Vector3(-75, 0,0), 4, 10);
	var bluePlane = GeometryHelper.CreateVerticalPlaneAlongZ(Vector3(-75, 0,0), 4, 10);
	
	//You can also change the colors
	GeometryHelper.ApplyColor(redPlane, Color.red);
	GeometryHelper.ApplyColor(greenPlane, Color.green);
	GeometryHelper.ApplyColor(bluePlane, Color.blue);
}

@MenuItem ("Assignment1/Build Triangle Cluster")
static function BuildTriangleCluster(){
	
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

@MenuItem ("Assignment1/Cube Explosion")
static function CubeExplosion(){
	for(var i = 0; i < 500; i++){
		//create a position 
		var pos : Vector3 = Random.insideUnitSphere * 100;
		var size : float = Mathf.Pow((100 - pos.magnitude), 2) / 200.0;
		var cube : GameObject = GeometryHelper.CreateCube(pos, size);
		cube.transform.rotation = Random.rotation;
	}
}

@MenuItem ("Assignment1/Glassy Wave")
static function GlassyWave(){
	var tri : GameObject;
	GeometryHelper.BeginPolys();
	for(var z = 0; z < 25; z++){
		for(var x = 0; x < 25; x++){
			GeometryHelper.AddPoly(Vector3(x,0,z), // the bottom two points are in rows along x
									  Vector3(x+.5, Mathf.Abs(Mathf.Sin(x/2.0)*4), Mathf.Abs(z+Mathf.Sin(z/2.0)*2)), //the top waves
									  Vector3(x-1,0,z) ); //one back so the bottom vertices touch
		}
	}
	GeometryHelper.EndPolys();
}

@MenuItem ("Assignment1/Move Camera")
static function MoveCamera(){
	Camera.main.transform.position = Vector3(10, 0, 10); //move it somewhere;
	Camera.main.transform.LookAt(Vector3(0, 0, 0)); // point it at something!;
}

@MenuItem ("Assignment1/Build My Memory")
static function BuildMemory() {
	//Fill this out
	
}

