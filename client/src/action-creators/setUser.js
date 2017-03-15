const setUser = (fbid, vanity, name, short_name, profile_pic_src, cover_photo_src) => {
  return {
    type: 'SET_USER',
    fbid,
    vanity,
    name,
    short_name,
    profile_pic_src,
    cover_photo_src
  }
}

export default setUser
