//This was the particle test we tried together at the end of class

public var cubes : GameObject[];
public var boundingPlane : GameObject;
public var maxDistance : float = 100;
public var forcePower : float = 4; 

function Update () {
	var center : Vector3;
	var i;
	//find the center of all the cubes
	for(i = 0; i < cubes.length; i++){
		center += cubes[i].transform.position;
	}
	center /= cubes.length;
	
	//move them all away
	for(i = 0; i < cubes.length; i++){
		var awayFromCenter : Vector3 = (cubes[i].transform.position - center).normalized;
		var force : float = Mathf.Max(maxDistance - (cubes[i].transform.position - center).magnitude, 0);
		Debug.DrawRay(cubes[i].transform.position, awayFromCenter * Mathf.Pow(force, forcePower), Color.red);
		cubes[i].transform.position += awayFromCenter * Mathf.Pow(force, forcePower);
	}
}

function PersonEntered(person : TSPS.Person){
	Debug.Log("person entered");
}

function PersonUpdated(person : TSPS.Person ){
	Debug.Log("person updated");
	var position = positionForPerson(person);
	for(var i = 0; i < cubes.length; i++){
		cubes[i].transform.position = Vector3.Lerp(cubes[i].transform.position, position, .01);
	}
}

function PersonWillLeave(person : TSPS.Person ){
	Debug.Log("person left");	
}

private function positionForPerson(person : TSPS.Person) : Vector3 {
	var meshBounds : Bounds  = boundingPlane.GetComponent("MeshFilter").sharedMesh.bounds;
	return new Vector3( (.5 - person.centroidX) * meshBounds.size.x, 0.25f, (person.centroidY - .5) * meshBounds.size.z );
}

