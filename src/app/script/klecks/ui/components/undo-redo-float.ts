import {BB} from '../../../bb/bb';
import {LANG} from '../../../language/language';
import {PointerListener} from '../../../bb/input/pointer-listener';

type TBaseToolRowButton = {
    el: HTMLElement;
};

type TToolRowButton = TBaseToolRowButton & {
    pointerListener: PointerListener;
};

type TToolRowTriangleButton = TBaseToolRowButton & {
    setIsEnabledLeft: (b: boolean) => void;
    setIsEnabledRight: (b: boolean) => void;
    leftPointerListener: PointerListener;
    rightPointerListener: PointerListener;
};

export class UndoRedoFloat {

    private readonly rootEl: HTMLElement;
    private readonly undoButton: TToolRowButton;
    private readonly redoButton: TToolRowButton;

    // ---- public ----

    constructor (
        p: {
            onUndo: () => void;
            onRedo: () => void;
        }
    ) {
        this.rootEl = BB.el( {
            className: 'kl-toolspace-row',
            css: {
                display: 'flex',
                position: 'fixed',
                top: '0px',
                right: '0px',
                margin: '16px',
                gap: '16px',
            },
        });

        const createButton = (p: {
            onClick: () => void;
            image: string;
            text: string;
        }): TToolRowButton => {

            const el = BB.el({
                className: 'toolspace-row-button nohighlight',
                onClick: p.onClick,
                css: {
                    border: '1px solid black',
                    display: 'flex',
                    padding: '8px',
                    gap: '4px',
                    fontSize: '24px',
                    lineHeight: '24px',
                    backgroundColor: '#000',
                    color: '#fff',
                    userSelect: 'none',
                },
            });

            const img = BB.el({
                className: 'dark-invert',
                content: p.image,
                css: {
                    pointerEvents: 'none',
                },
            });

            el.append(img);

            const txt = BB.el({
                content: p.text,
                css: {
                    pointerEvents: 'none',
                },
            });

            el.append(txt);

            const pointerListener = new BB.PointerListener({ // because :hover causes problems w touch
                target: el,
                onEnterLeave: (isOver) => {
                    el.classList.toggle('toolspace-row-button-hover', isOver);
                },
            });
            return {
                el,
                pointerListener,
            };
        };

        this.undoButton = createButton({
            onClick: p.onUndo,
            image: '',
            text:'UNDO',
        });
        this.undoButton.el.title = LANG('undo');
        this.undoButton.el.classList.add('toolspace-row-button-disabled');
        this.rootEl.append(this.undoButton.el);

        this.redoButton = createButton({
            onClick: p.onRedo,
            image: '',
            text: 'REDO',
        });
        this.redoButton.el.title = LANG('redo');
        this.redoButton.el.classList.add('toolspace-row-button-disabled');
        this.rootEl.append(this.redoButton.el);
    }

    // ---- interface ----

    getElement (): HTMLElement {
        return this.rootEl;
    }

    setEnableUndo (b: boolean): void {
        this.undoButton.el.classList.toggle('toolspace-row-button-disabled', !b);
    }

    setEnableRedo (b: boolean): void {
        this.redoButton.el.classList.toggle('toolspace-row-button-disabled', !b);
    }
}
