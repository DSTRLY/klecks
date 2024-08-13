import { BB } from '../../../bb/bb';
import collapseImg from '/src/app/img/ui/ui-collapse.svg';
import { LANG } from '../../../language/language';
import { TUiLayout } from '../../kl-types';

const HIDE_TOOLS_TXT = 'HIDE TOOLS';
const SHOW_TOOLS_TXT = 'SHOW TOOLS';

/**
 * button that allows to collapse toolspace (for mobile)
 */
export class ToolspaceCollapser {

    private readonly rootEl: HTMLElement;
    private directionStr: TUiLayout;
    // private readonly icon: HTMLElement;
    private stateIsOpen: boolean;
    private readonly txt: HTMLElement;


    private update(): void {
        if (this.directionStr === 'left') {
            // this.icon.style.transform = this.stateIsOpen ? 'rotate(180deg)' : '';
            this.txt.textContent = this.stateIsOpen ? HIDE_TOOLS_TXT : SHOW_TOOLS_TXT;
        } else {
            // this.icon.style.transform = this.stateIsOpen ? '' : 'rotate(180deg)';
            this.txt.textContent = this.stateIsOpen ? HIDE_TOOLS_TXT : SHOW_TOOLS_TXT;
        }
    }

    // ---- public ----
    constructor(
        p: {
            onChange: () => void;
        }
    ) {
        this.stateIsOpen = true;
        this.directionStr = 'right';

        this.rootEl = BB.el({
            className: 'kl-toolspace-toggle',
            css: {
                background: '#000',
                border: '1px solid black',
                color: '#fff',
                position: 'absolute',
                top: '0',
                textAlign: 'center',
                lineHeight: '36px',
                cursor: 'pointer',
                userSelect: 'none',
                paddingBottom: '8px',
                boxSizing: 'border-box',
                fontSize: '24px',
            },
            title: LANG('toggle-show-tools'),
            onClick: (e) => {
                e.preventDefault();
                this.stateIsOpen = !this.stateIsOpen;
                this.update();
                p.onChange();
            },
        });

        // this.icon = BB.el({
        //     parent: this.rootEl,
        //     content: '➡️',
        //     css: {
        //         userSelect: 'none',
        //     },
        // });

        this.txt = BB.el({
            content: this.stateIsOpen ? HIDE_TOOLS_TXT : SHOW_TOOLS_TXT,
            css: {
                marginTop: '8px',
                writingMode: 'vertical-rl',
            }
        });

        this.rootEl.appendChild(this.txt);

        this.rootEl.oncontextmenu = () => {
            return false;
        };
    }

    // ---- interface ----

    isOpen(): boolean {
        return this.stateIsOpen;
    }

    setDirection(dirStr: TUiLayout): void {
        this.directionStr = dirStr;
        this.update();
    }

    getElement(): HTMLElement {
        return this.rootEl;
    }

}
