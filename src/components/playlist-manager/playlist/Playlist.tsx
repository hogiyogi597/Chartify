import React, { useEffect, useState } from 'react'
import { useGlobal } from '../../../hooks/use-global-context'
import { AspectRatio, Box, Divider, Heading, Image, Text } from '@chakra-ui/core'
import { Flex } from '@chakra-ui/core'

const Playlist = (playlist: SpotifyApi.PlaylistObjectSimplified) => {
    const { images, name, tracks, description, id } = playlist
    const { selectedPlaylistsMap, togglePlaylistFromMap } = useGlobal()
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        setIsSelected(selectedPlaylistsMap.get(id) !== undefined)
    }, [togglePlaylistFromMap])

    const image: SpotifyApi.ImageObject | undefined = images[0] || images[1] || images[2]
    return (
        <Flex
            display="flex"
            justifyContent="left"
            cursor="pointer"
            color='brand.lightest'
            borderWidth='.3rem'
            borderColor={'brand.darkest'}
            _hover={{ bg: 'brand.darker' }}
            bg={isSelected ? "brand.darkest" : "brand.dark"}

            onClick={() => togglePlaylistFromMap(playlist)}
        >
            <Image src={image?.url} height='15rem' width='15rem' alt="playlist cover art" objectFit='cover' />
            <Box
                display="flex"
                flexDir="column"
                justifyContent="center"
                marginLeft="2rem"
                paddingRight="5rem"
            >
                <Heading as="h2" paddingBottom=".5rem">{name}</Heading>
                <Divider />
                <Heading as="h3">Tracks: {tracks.total}</Heading>
                <Text>{description === null || description === "" ? "No description available" : description}</Text>
            </Box>
        </Flex>
    )
}

export default Playlist