const {app, BrowserWindow, Menu} = require('electron');

let mainWindow;

var fs = false;

process.env.NODE_ENV = 'production';

// Listen for the app to be ready

app.on('ready', () => {
	mainWindow = new BrowserWindow({ frame: false });
	
	mainWindow.loadURL(`file://${__dirname}/mainWindow.html`);
	
	// Quit app when closed
	mainWindow.on('closed', function(){
		app.quit();
	});
	
	// Build menu from template
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	// Insert menu
	Menu.setApplicationMenu(mainMenu);
});

// Create menu template
const mainMenuTemplate = [
	{
		label:'🏠',
		submenu: [
			{
				label: 'Fullscreen',
				accelerator: process.platform == 'darwin' ? 'Command+F' : 'Ctrl+F',
				click(){
					if (fs == false){
						mainWindow.maximize();
						fs = true;
					}else{
						mainWindow.unmaximize();
						fs = false;
					}
				}
			},
			{
				label: 'Quit',
				accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
				click(){
					app.quit();
				}
			}
		]
	}
];

// mac suck
if (process.platform == 'darwin'){
	mainMenuTemplate.unshift({});
}