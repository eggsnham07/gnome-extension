const St = imports.gi.St;
const Gio = imports.gi.Gio;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;

class Extension {
    constructor() {
        this._indicator = null;

        this.settings = ExtensionUtils.getSettings('org.gnome.shell.extensions.eggsn');
    }

    enable() {
        log(`Enabling ${Me.metadata.name}`);

        let indicatorName = `${Me.metadata.name} Indicator`;

        this._indicator = new PanelMenu.Button(0.0, indicatorName, false);

        let icon = new St.Icon({
            gicon: new Gio.ThemedIcon({name: 'face-laugh-symbolic'}),
            style_class: 'system-status-icon'
        });
        this._indicator.add_child(icon);

        this.settings.bind(
            'show-indicator',
            this._indicator,
            'visible',
            Gio.SettingsBindFlags.DEFAULT
        );

        Main.panel.addToStatusArea(indicatorName, this._indicator);
    }

    disable() {
        log(`Disabling ${Me.metadata.name}`);

        this._indicator.destroy();
        this._indicator = null;
    }
}

function init() {
    log(`Initializing ${Me.metadata.name}`);

    return new Extension();
}