import { auth, db, storage } from '../firebase'

export const userProfileImage = (userInfo) => {
  if(userInfo) {
    const pathInfo = userInfo.profileImageInfo
    const bucket = pathInfo.bucket
    const fileName = pathInfo.fileName
    const path = `${bucket}/${fileName}`
    const storageRef = storage.ref()
    const image = storageRef.child(path)

    image.getDownloadURL()
    .then((url) => {
      console.log('INSIDE DATABASE', url)
      return url
    })
  }
  return
}
