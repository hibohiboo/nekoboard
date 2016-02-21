import { Dialog, TextField, FlatButton } from 'material-ui';
import React, { Component, PropTypes } from 'react';

export class EditTextDialog extends Component {
    static get propTypes() {
        return {
            add: PropTypes.func.isRequired,
            close: PropTypes.func.isRequired,
            dialog: PropTypes.object.isRequired,
            editor: PropTypes.object.isRequired,
        };
    }

    onOK() {
        const {
            editor,
            dialog,
            close,
            add,
        } = this.props;

        add({
            shape: editor.shape,
            x: dialog.editText.x,
            y: dialog.editText.y,
            text: this.text.getValue(),
            fill: editor.fill,
            stroke: editor.stroke,
            strokeWidth: editor.strokeWidth,
            fontSize: editor.fontSize,
        });
        close('editText');
    }

    render() {
        const {
            dialog,
            close,
        } = this.props;

        const actions = [
            <FlatButton primary
                key="ok"
                label="OK"
                onTouchTap={() => this.onOK()}
            />,
            <FlatButton secondary
                key="cancel"
                label="CANCEL"
                onTouchTap={() => close('editText')}
            />,
        ];

        return (
            <Dialog
                actions={actions}
                open={!!dialog.editText}
                title="Text"
            >
                <TextField fullWidth ref={(c) => c && (this.text = c)} />
            </Dialog>
        );
    }
}