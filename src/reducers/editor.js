import { eq, pick } from 'lodash';
import * as EDITOR from '../constants/actions/Editor';
import * as MODE from '../constants/Mode';
import * as SHAPE from '../constants/Shape';
import { StateStorage } from './state-storage';

const storage = new StateStorage(
    'nekoboard/editor',
    {
        mode: MODE.DEFAULT,
        shape: SHAPE.DEFAULT,
        fill: false,
        fillColor: '#ffffff',
        fontSize: 16,
        stroke: true,
        strokeColor: '#000000',
        strokeWidth: 1,
        styleHistory: [],
        edit: null,
        snap: true,
        ox: 0, oy: 0,
    },
    [
        'mode',
        'shape',
        'fill',
        'fillColor',
        'fontSize',
        'stroke',
        'strokeColor',
        'strokeWidth',
        'styleHistory',
        'snap',
    ]
);

export const editor = storage.apply((state, action) => {
    switch (action.type) {
        case EDITOR.MODE:
            return {
                ...state,
                mode: action.mode,
            };
        case EDITOR.SHAPE:
            return {
                ...state,
                shape: action.shape,
            };
        case EDITOR.STYLE: {
            const keys = [
                'fill',
                'fillColor',
                'fontSize',
                'stroke',
                'strokeColor',
                'strokeWidth',
            ];
            const style = pick(action, keys);

            if (eq(style, pick(state, keys))) return state;

            return {
                ...state,
                ...style,
                styleHistory: [
                    style,
                    ...state.styleHistory,
                ].slice(0, 10),
            };
        } case EDITOR.SNAP:
            return {
                ...state,
                snap: action.snap,
            };
        case EDITOR.EDIT_BEGIN:
            if (state.mode === MODE.EDIT) {
                switch (state.shape) {
                    case SHAPE.TEXT:
                    case SHAPE.PIECE:
                        return state;
                }
            } else if (state.mode === MODE.ERASE || !action.id) {
                return state;
            }

            return {
                ...state,
                edit: action.id,
                ...pick(action, ['ox', 'oy']),
            };
        case EDITOR.EDIT_END:
        case EDITOR.EDIT_CANCEL:
            return {
                ...state,
                edit: null,
            };
    }

    return state;
});
