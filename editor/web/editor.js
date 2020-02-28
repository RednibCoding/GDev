
class Manager
{
	constructor(backendPython=true)
	{
		this.backendPython = backendPython;
	}

	getEntities()
	{
		if(this.backendPython)
		{
			eel.expose(myFunction)
			function myFunction()
			{

			}
		}
		else
		{
			// do something else
		}
		
	}
}

myManager = new Manager(backendPython=false)

var entities = myManager.getEntities()