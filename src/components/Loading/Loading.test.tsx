import * as React from 'react';
import {HTMLAttributes, shallow, ShallowWrapper} from 'enzyme';
import Loading, {LoadingProps} from './Loading';

let loading: ShallowWrapper<typeof Loading, LoadingProps & HTMLAttributes>;
let dualRingLoading: ShallowWrapper<
    typeof Loading,
    LoadingProps & HTMLAttributes
>;
let circlesLoading: ShallowWrapper<
    typeof Loading,
    LoadingProps & HTMLAttributes & {className: string}
>;
let heartLoading: ShallowWrapper<typeof Loading, LoadingProps & HTMLAttributes>;

describe('loading Component', () => {
    beforeEach(() => {
        loading = shallow(<Loading />);
        dualRingLoading = shallow(
            <Loading type="dual-ring" alignCenter={false} />
        );
        circlesLoading = shallow(<Loading type="circles" alignCenter={true} />);
        heartLoading = shallow(<Loading type="heart" alignCenter={true} />);
    });

    // checking that all is fine and component has been rendered
    it('should render without error', () => {
        expect(loading.length).toBe(1);
        expect(dualRingLoading.length).toBe(1);
        expect(circlesLoading.length).toBe(1);
        expect(heartLoading.length).toBe(1);
    });

    it('should align center if alignCenter prop is true', () => {
        const predicateFn = (elm) =>
            elm.getElement().props.className.includes('alignCenter');
        expect(predicateFn(circlesLoading)).toBe(true);
        expect(predicateFn(dualRingLoading)).toBe(false);
        expect(predicateFn(loading)).toBe(false);
    });

    it('should render fallback content if no type prop', () => {
        // without type should render the content
        expect(loading.text()).toBe('Loading...');
    });

    it('should render the respective template for the corresponding type prop', () => {
        // checking whether the type prop is rendering heart content
        expect(heartLoading.find('div.heart-wrap').length).toBe(1);
        expect(dualRingLoading.find('div.ring').length).toBe(1);
        expect(circlesLoading.find('div.circles').length).toBe(1);

        // negative scenario
        expect(dualRingLoading.find('div.circles').length).toBe(0);
    });
});
