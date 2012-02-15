public var frequency : float;
public var amplitude : float;
public var speed : float;

private var originalVertices : Vector3[];
function Start () {
	var originalMesh = gameObject.GetComponent(MeshFilter).mesh;
	originalVertices = originalMesh.vertices;
}

function Update () {
	var originalMesh = gameObject.GetComponent(MeshFilter).mesh;
	var modifiedVertices = originalVertices;
	for(var i = 0; i < modifiedVertices.Length; i++){
		var z = modifiedVertices[i].z;
		var offset : float = Mathf.Sin( z * frequency + speed*Time.time ) * amplitude;
		modifiedVertices[i].y = offset;
	}
	
	originalMesh.vertices = modifiedVertices;
}