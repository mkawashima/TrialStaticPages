10.times do |n|
  Admin.seed do |s|
    s.id    = n
    s.email = "admin#{n}@example.com"
    s.password = "password"
  end
end