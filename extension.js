const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const St = imports.gi.St;
const Clutter = imports.gi.Clutter;
const Meta = imports.gi.Meta;
const Lang = imports.lang;
const Overview = imports.ui.overview

let activities;
let button;


const ActivitiesIcon = new Lang.Class({
    Name: 'ActivitiesIcon',
    Extends: PanelMenu.Button,

    _init()
    {
        this.parent(0.0, null, true);

        this.wm = global.workspace_manager;

        this.box = new St.BoxLayout({style_class: 'activity-box'});

        this.appButton = new St.Button();
        this.appIcon = new St.Icon({icon_name: 'view-app-grid-symbolic', style_class: 'activity-icon'});
        this.appButton.add_actor(this.appIcon);
        this.appButton.connect('clicked', () => this._clickedBTN(true));
        //this.appButton.connect('scroll-event', (actor, event) => this._scrollWindows(actor, event));
        this.box.add_actor(this.appButton);

        this.actor.add_child(this.box);
    },

    destroy()
    {
        this.parent();
    },

    _clickedBTN(appsButtonChecked)
    {
        // selecting the same view again will hide the overview
        if (Main.overview.visible)
        {
            Main.overview.hide();
            return;
        }

        if (!Main.overview.visible)
            Main.overview.show();
    	}

});

function init()
{
    activities = Main.panel.statusArea['activities'];
}

function enable()
{
    button = new ActivitiesIcon();

    activities.container.hide();
    Main.panel.addToStatusArea('activitiesicon', button, 0, 'left');
}

function disable()
{
    button.destroy();
    activities.container.show();
}
