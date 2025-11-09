// Lấy dữ liệu từ API RandomUser
export const fetchRandomUsers = async (count = 50) => {
  const res = await fetch(`https://randomuser.me/api/?results=${count}`);
  const data = await res.json();
  return data.results.map(u => ({
    id: u.login.uuid,
    fullName: `${u.name.first} ${u.name.last}`,
    avatar: u.picture.thumbnail,
    largeAvatar: u.picture.large,
    phone: u.phone,
    email: u.email,
    location: `${u.location.city}, ${u.location.country}`,
  }));
};
