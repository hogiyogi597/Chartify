import { Box, Button, Flex } from '@chakra-ui/core'
import React from 'react'


type PaginationProps = {
    hasPrev: boolean,
    hasNext: boolean,
    onPrevious: () => any,
    onNext: () => any
}

const Pagination = ({ hasPrev, hasNext, onPrevious, onNext }: PaginationProps) => {
    return (
        <Flex justifyContent='space-between'>
            <Button
                disabled={!hasPrev}
                onClick={onPrevious}
            >
                Prev
            </Button>
            <Button
                disabled={!hasNext}
                onClick={onNext}
            >
                Next
            </Button>
        </Flex>
    )
}

export default Pagination