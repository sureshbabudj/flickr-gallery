import {renderHook, act} from '@testing-library/react-hooks';
import useMemoCompare from './useMemoCompare';

describe('useJsonp hook', () => {
    // predicate for comparison
    const compare = (p, n) => p && p.value == n.value;

    beforeEach(() => {});

    it('should compare the data when prop changes', () => {
        const mockCompare = jest.fn(compare);
        let next = {value: 1};
        const output = renderHook(() => useMemoCompare(next, mockCompare));

        expect(mockCompare.mock.calls.length).toBe(1);
        expect(output.result.current.value).toBe(1);

        // change prop value
        act(() => {
            next = {value: 2};
            output.rerender(next);
        });
        expect(mockCompare.mock.calls.length).toBe(2);
        expect(output.result.current.value).toBe(2);
    });

    it('should not update return value when same value passed', () => {
        const mockCompare = jest.fn(compare);
        let next: {value: string | number} = {value: 1};
        const output = renderHook(() => useMemoCompare(next, mockCompare));

        expect(output.result.current.value).toBe(1);

        act(() => {
            next = {value: '1'};
            output.rerender(next);
        });

        expect(output.result.current.value).toBe(1);
    });
});
