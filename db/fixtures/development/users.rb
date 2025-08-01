10.times do |n|
  User.seed do |s|
    s.id    = n
    s.email = "user#{n}@example.com"
    s.password = "password"
  end
end