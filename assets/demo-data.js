/* Fimex prototype — shared fictional demo data.
   All companies, people, e-mails, licenses and numbers are invented.
   Only the shape of the data mirrors the real platform. */
(function () {
  var Demo = {};

  Demo.company = {
    name: 'Gulf Bridge Distribution FZCO',
    address: 'Office 512, Building 2E, DAFZA, Dubai, UAE',
    phone: '+971 4 555 01 20',
    email: 'ops@gulfbridge.example',
    trn: '100489012300003',
    license: 'DM-2026-88412',
    licenseEnd: '15.09.2027',
    number: 'F:10059/C'
  };

  Demo.by = function (arr, key, val) {
    for (var i = 0; i < (arr || []).length; i++) if (arr[i][key] === val) return arr[i];
    return null;
  };

  Demo.date = function (y, m, d) {
    var mm = m < 10 ? '0' + m : '' + m, dd = d < 10 ? '0' + d : '' + d;
    return dd + '.' + mm + '.' + y;
  };

  Demo.me = { name: 'Alex Petrov', email: 'a.petrov@fimex.example', role: 'superadmin', initials: 'AP' };

  Demo.countries = [
    { id: 5, name: 'UAE', short: 'UAE', abbr: 'AE', currency: 'AED', symbol: 'AED', rate: 3.6725, tz: 'Asia/Dubai', deliveryDays: 2, minOrder: 10000, p2pStep: 50, sales: true, payment: 'Cash', checkpoint: '18:00', prefix: 'ae' },
    { id: 13, name: 'Kazakhstan', short: 'KZ', abbr: 'KZ', currency: 'KZT', symbol: '₸', rate: 498.2, tz: 'Asia/Almaty', deliveryDays: 5, minOrder: 350000, p2pStep: 500, sales: true, payment: 'Cash', checkpoint: '12:00', prefix: 'kz' },
    { id: 14, name: 'Uzbekistan', short: 'UZ', abbr: 'UZ', currency: 'UZS', symbol: 'soʻm', rate: 12650, tz: 'Asia/Tashkent', deliveryDays: 6, minOrder: 5000000, p2pStep: 5000, sales: true, payment: 'Cash', checkpoint: '12:00', prefix: 'uz' },
    { id: 15, name: 'Saudi Arabia', short: 'KSA', abbr: 'SA', currency: 'SAR', symbol: 'SAR', rate: 3.75, tz: 'Asia/Riyadh', deliveryDays: 3, minOrder: 20000, p2pStep: 100, sales: true, payment: 'Online', checkpoint: '17:00', prefix: 'sa' },
    { id: 16, name: 'Qatar', short: 'QAT', abbr: 'QA', currency: 'QAR', symbol: 'QAR', rate: 3.64, tz: 'Asia/Qatar', deliveryDays: 3, minOrder: 15000, p2pStep: 100, sales: true, payment: 'Cash', checkpoint: '17:00', prefix: 'qa' },
    { id: 17, name: 'Kuwait', short: 'KWT', abbr: 'KW', currency: 'KWD', symbol: 'KWD', rate: 0.307, tz: 'Asia/Kuwait', deliveryDays: 4, minOrder: 4000, p2pStep: 25, sales: false, payment: 'Cash', checkpoint: '16:00', prefix: 'kw' }
  ];

  Demo.brands = [
    { id: 1, name: 'Apple', color: '#1a1a1a' },
    { id: 11, name: 'Samsung', color: '#1428a0' },
    { id: 2, name: 'Xiaomi', color: '#ff6900' },
    { id: 18, name: 'Google', color: '#4285f4' },
    { id: 8, name: 'OnePlus', color: '#f5010c' },
    { id: 14, name: 'Honor', color: '#00a3e0' },
    { id: 55, name: 'Meta', color: '#0866ff' },
    { id: 63, name: 'Whoop', color: '#0b0b0b' },
    { id: 70, name: 'DJI', color: '#111111' }
  ];

  Demo.categories = [
    { id: 1667, name: 'iPhone', brand: 'Apple' },
    { id: 1666, name: 'iPad', brand: 'Apple' },
    { id: 1670, name: 'MacBook', brand: 'Apple' },
    { id: 1671, name: 'Apple Watch', brand: 'Apple' },
    { id: 1672, name: 'AirPods', brand: 'Apple' },
    { id: 1701, name: 'Galaxy S', brand: 'Samsung' },
    { id: 1702, name: 'Galaxy Z', brand: 'Samsung' },
    { id: 1703, name: 'Galaxy A', brand: 'Samsung' },
    { id: 1720, name: 'Redmi', brand: 'Xiaomi' },
    { id: 1721, name: 'Poco', brand: 'Xiaomi' },
    { id: 1722, name: 'Xiaomi', brand: 'Xiaomi' },
    { id: 1730, name: 'Pixel', brand: 'Google' },
    { id: 1740, name: 'OnePlus', brand: 'OnePlus' },
    { id: 1750, name: 'Honor', brand: 'Honor' },
    { id: 1760, name: 'Meta Quest', brand: 'Meta' },
    { id: 1761, name: 'Whoop', brand: 'Whoop' },
    { id: 1770, name: 'Osmo', brand: 'DJI' }
  ];

  Demo.subcategories = [
    { id: 2038, categoryId: 1667, name: 'iPhone 18 Pro' },
    { id: 2039, categoryId: 1667, name: 'iPhone 18 Pro Max' },
    { id: 1616, categoryId: 1667, name: 'iPhone 17 Pro' },
    { id: 1617, categoryId: 1667, name: 'iPhone 17 Pro Max' },
    { id: 1614, categoryId: 1667, name: 'iPhone 17' },
    { id: 1610, categoryId: 1667, name: 'iPhone 16' },
    { id: 2042, categoryId: 1666, name: 'iPad Pro 13 M5' },
    { id: 2043, categoryId: 1666, name: 'iPad Air 11' },
    { id: 2044, categoryId: 1670, name: 'MacBook Pro 14 M5' },
    { id: 2045, categoryId: 1670, name: 'MacBook Air 13 M4' },
    { id: 2046, categoryId: 1671, name: 'Watch Series 11' },
    { id: 2047, categoryId: 1671, name: 'Watch Ultra 3' },
    { id: 2048, categoryId: 1672, name: 'AirPods Pro 3' },
    { id: 2049, categoryId: 1672, name: 'AirPods Max' },
    { id: 2050, categoryId: 1701, name: 'Galaxy S26 Ultra' },
    { id: 2051, categoryId: 1701, name: 'Galaxy S26+' },
    { id: 2052, categoryId: 1702, name: 'Galaxy Z Fold 8' },
    { id: 2053, categoryId: 1702, name: 'Galaxy Z Flip 8' },
    { id: 2054, categoryId: 1703, name: 'Galaxy A57' },
    { id: 2055, categoryId: 1720, name: 'Redmi Note 15 Pro' },
    { id: 2056, categoryId: 1720, name: 'Redmi 16C' },
    { id: 2057, categoryId: 1721, name: 'Poco X8 Pro' },
    { id: 2058, categoryId: 1722, name: 'Xiaomi 16' },
    { id: 2059, categoryId: 1730, name: 'Pixel 11 Pro' },
    { id: 2060, categoryId: 1730, name: 'Pixel 11' },
    { id: 2061, categoryId: 1740, name: 'OnePlus 15' },
    { id: 2062, categoryId: 1740, name: 'OnePlus 15R' },
    { id: 2063, categoryId: 1750, name: 'Honor Magic 9 Pro' },
    { id: 2064, categoryId: 1760, name: 'Quest 4' },
    { id: 2065, categoryId: 1761, name: 'Whoop 6.0' },
    { id: 2066, categoryId: 1770, name: 'Osmo Pocket 4' }
  ];

  Demo.suppliers = [
    { id: 433, name: 'NOVA DISTRIBUTION FZCO', short: 'NOVA', country: 'UAE', city: 'Dubai', manager: 'R. Haddad', email: 'sales@novadist.example', phone: '+971 4 555 10 10', trn: '100112233400003', license: 'DM-2025-40118', licenseEnd: '12.03.2027', purchases: ['UAE', 'Kazakhstan'], status: 'active', since: '2023', debt: 18400 },
    { id: 434, name: 'CELLPORT TRADING LLC', short: 'CELLPORT', country: 'UAE', city: 'Dubai', manager: 'M. Farouk', email: 'orders@cellport.example', phone: '+971 4 555 20 20', trn: '100223344500003', license: 'DM-2024-11702', licenseEnd: '05.11.2026', purchases: ['UAE', 'Saudi Arabia'], status: 'active', since: '2022', debt: 0 },
    { id: 435, name: 'TECHVISION IMPEX', short: 'TECHVISION', country: 'UAE', city: 'Sharjah', manager: 'S. Ahmed', email: 'hello@techvision.example', phone: '+971 6 555 30 30', trn: '100334455600003', license: 'SH-2025-88301', licenseEnd: '19.06.2027', purchases: ['UAE', 'Qatar'], status: 'active', since: '2024', debt: 6200 },
    { id: 436, name: 'ORBIT SUPPLY FZCO', short: 'ORBIT', country: 'UAE', city: 'Dubai', manager: 'K. Smirnov', email: 'supply@orbit.example', phone: '+971 4 555 40 40', trn: '100445566700003', license: 'DM-2026-22017', licenseEnd: '02.02.2028', purchases: ['UAE', 'Kazakhstan', 'Uzbekistan'], status: 'active', since: '2025', debt: 42800 },
    { id: 437, name: 'ZENITH MOBILE TRADING', short: 'ZENITH', country: 'UAE', city: 'Ajman', manager: 'A. Ibrahim', email: 'info@zenithmobile.example', phone: '+971 6 555 50 50', trn: '100556677800003', license: 'AJ-2024-77120', licenseEnd: '23.08.2026', purchases: ['UAE'], status: 'paused', since: '2022', debt: 0 },
    { id: 438, name: 'SAHARA GADGETS LLC', short: 'SAHARA', country: 'UAE', city: 'Dubai', manager: 'H. Al Ali', email: 'sales@saharagadgets.example', phone: '+971 4 555 60 60', trn: '100667788900003', license: 'DM-2025-33210', licenseEnd: '30.12.2027', purchases: ['UAE', 'Saudi Arabia', 'Kuwait'], status: 'active', since: '2023', debt: 9800 },
    { id: 439, name: 'MERIDIAN TECH FZE', short: 'MERIDIAN', country: 'UAE', city: 'Dubai', manager: 'P. Ivanov', email: 'b2b@meridiant.example', phone: '+971 4 555 70 70', trn: '100778899000003', license: 'DM-2026-10544', licenseEnd: '14.04.2028', purchases: ['UAE', 'Kazakhstan'], status: 'active', since: '2026', debt: 0 },
    { id: 440, name: 'ATLAS DEVICES FZCO', short: 'ATLAS', country: 'UAE', city: 'Dubai', manager: 'J. Park', email: 'trade@atlasdevices.example', phone: '+971 4 555 80 80', trn: '100889900100003', license: 'DM-2025-50981', licenseEnd: '08.09.2027', purchases: ['UAE', 'Qatar', 'Saudi Arabia'], status: 'active', since: '2024', debt: 21500 }
  ];

  Demo.customers = [
    { id: 2433, name: 'Gulf Mobile Retail LLC', user: 'Rashid Al Mansoori', email: 'r.almansoori@gulfmobile.example', phone: '+971 50 555 11 11', country: 'UAE', city: 'Dubai', license: 'DED-772301', licenseEnd: '14.02.2028', trn: '100447711200003', deposit: 20000, penalty: 24, balance: 0, status: 'active', subscription: 'active', mode: 'Cash', wholesale: 'Cash', logistics: 'Aramex Gulf', lang: 'en' },
    { id: 2434, name: 'Emirates Phone Store', user: 'Fatima Khalid', email: 'fatima@emiratesphone.example', phone: '+971 50 555 22 22', country: 'UAE', city: 'Abu Dhabi', license: 'DED-811455', licenseEnd: '02.06.2027', trn: '100881122300003', deposit: 15000, penalty: 0, balance: 1450, status: 'active', subscription: 'active', mode: 'Cash', wholesale: 'Cash', logistics: 'Aramex Gulf', lang: 'en' },
    { id: 2435, name: 'Palm Digital', user: 'Omar Saleh', email: 'omar@palmdigital.example', phone: '+971 55 555 33 33', country: 'UAE', city: 'Sharjah', license: 'SED-203322', licenseEnd: '21.10.2027', trn: '100223344500003', deposit: 8000, penalty: 120, balance: -3200, status: 'active', subscription: 'active', mode: 'Online', wholesale: 'Online', logistics: 'Own pickup', lang: 'en' },
    { id: 2436, name: 'Skyline Trading', user: 'Aigerim Suleimenova', email: 'a.suleimenova@skyline.example', phone: '+7 701 555 44 44', country: 'Kazakhstan', city: 'Almaty', license: 'KZ-441209', licenseEnd: '11.12.2027', trn: '600112233400003', deposit: 5000, penalty: 0, balance: 7200, status: 'active', subscription: 'active', mode: 'Cash', wholesale: 'Cash', logistics: 'KazPost Cargo', lang: 'ru' },
    { id: 2437, name: 'Tashkent Mobile Hub', user: 'Dilshod Rakhimov', email: 'd.rakhimov@tmhub.example', phone: '+998 90 555 55 55', country: 'Uzbekistan', city: 'Tashkent', license: 'UZ-991024', licenseEnd: '05.05.2027', trn: '300445566700003', deposit: 3000, penalty: 18, balance: 0, status: 'active', subscription: 'expired', mode: 'Cash', wholesale: 'Cash', logistics: 'UZ Cargo', lang: 'ru' },
    { id: 2438, name: 'Riyadh Gadget Market', user: 'Nasser Al Otaibi', email: 'nasser@riyadhgadget.example', phone: '+966 50 555 66 66', country: 'Saudi Arabia', city: 'Riyadh', license: 'SA-330118', licenseEnd: '19.03.2028', trn: '310223344500003', deposit: 12000, penalty: 0, balance: 0, status: 'active', subscription: 'active', mode: 'Online', wholesale: 'Online', logistics: 'Saudi Post', lang: 'en' },
    { id: 2439, name: 'Doha Phone Center', user: 'Youssef Al Kuwari', email: 'youssef@dohaphone.example', phone: '+974 55 555 77 77', country: 'Qatar', city: 'Doha', license: 'QA-554210', licenseEnd: '27.08.2027', trn: '400667788900003', deposit: 6000, penalty: 45, balance: 980, status: 'active', subscription: 'active', mode: 'Cash', wholesale: 'Cash', logistics: 'Qatar Cargo', lang: 'en' },
    { id: 2440, name: 'Kuwait Smart Devices', user: 'Abdullah Al Sabah', email: 'abdullah@ksd.example', phone: '+965 90 555 88 88', country: 'Kuwait', city: 'Kuwait City', license: 'KW-119903', licenseEnd: '03.01.2028', trn: '500889900100003', deposit: 4000, penalty: 0, balance: 0, status: 'new', subscription: 'none', mode: 'Cash', wholesale: 'Cash', logistics: 'KW Express', lang: 'en' }
  ];

  Demo.team = [
    { id: 1, name: 'Alex Petrov', email: 'a.petrov@fimex.example', role: 'superadmin', status: 'active', last: '20.11.2026 09:14' },
    { id: 2, name: 'Maria Sokolova', email: 'm.sokolova@fimex.example', role: 'manager', status: 'active', last: '20.11.2026 08:51' },
    { id: 3, name: 'Daniyar Akhmetov', email: 'd.akhmetov@fimex.example', role: 'sales', status: 'active', last: '19.11.2026 18:02' },
    { id: 4, name: 'Ivan Chen', email: 'i.chen@fimex.example', role: 'warehouse', status: 'active', last: '19.11.2026 17:44' },
    { id: 5, name: 'Elena Kim', email: 'e.kim@fimex.example', role: 'service', status: 'active', last: '18.11.2026 12:30' },
    { id: 6, name: 'Omar Al Farsi', email: 'o.alfarsi@fimex.example', role: 'sales', status: 'active', last: '17.11.2026 10:11' },
    { id: 7, name: 'Julia Novak', email: 'j.novak@fimex.example', role: 'accountant', status: 'invited', last: '—' }
  ];

  Demo.statuses = [
    { id: 216, ru: 'Ожидает сборки', en: 'Pending assembly', color: '#A97F5A' },
    { id: 217, ru: 'Собран', en: 'Assembled', color: '#7B61FF' },
    { id: 218, ru: 'В ожидании вылета', en: 'Awaiting Departure', color: '#FF9901' },
    { id: 219, ru: 'Вылетел от поставщика', en: 'Departed from the supplier', color: '#37A0FA' },
    { id: 220, ru: 'В ожидании выдачи', en: 'Order pending delivery', color: '#F02727' },
    { id: 221, ru: 'Выдан', en: 'Released', color: '#68CC66' }
  ];

  Demo.reasons = [
    { id: 1, name: 'Не включается', fine: 85 },
    { id: 2, name: 'Разбит экран', fine: 240 },
    { id: 3, name: 'Не тот цвет', fine: 40 },
    { id: 4, name: 'Брак аккумулятора', fine: 120 },
    { id: 5, name: 'Повреждение при доставке', fine: 160 },
    { id: 6, name: 'Не работает камера', fine: 95 },
    { id: 7, name: 'Возврат без причины', fine: 55 }
  ];

  Demo.logistics = [
    { id: 114, name: 'Aramex Gulf', phone: '+971 4 555 01 90', address: 'Dubai Logistics City, Dubai', license: 'DM-2024-11043', licenseEnd: '30.06.2027', default: true },
    { id: 115, name: 'Emirates Post Logistics', phone: '+971 4 555 02 10', address: 'Al Karama, Dubai', license: 'DM-2023-88712', licenseEnd: '11.11.2026', default: false },
    { id: 116, name: 'KazPost Cargo', phone: '+7 727 555 03 20', address: 'Abay Ave 10, Almaty', license: 'KZ-2024-33012', licenseEnd: '02.02.2028', default: false },
    { id: 117, name: 'UZ Cargo', phone: '+998 71 555 04 30', address: 'Navoi St 24, Tashkent', license: 'UZ-2025-77120', licenseEnd: '19.09.2027', default: false },
    { id: 118, name: 'Saudi Post', phone: '+966 11 555 05 40', address: 'King Fahd Rd, Riyadh', license: 'SA-2025-20112', licenseEnd: '07.07.2028', default: false }
  ];

  Demo.currencies = [
    { iso: 'AED', symbol: 'AED', name: 'UAE Dirham', rate: 3.6725, locked: false },
    { iso: 'USD', symbol: '$', name: 'US Dollar', rate: 1, locked: true },
    { iso: 'KZT', symbol: '₸', name: 'Kazakhstani Tenge', rate: 498.2, locked: true },
    { iso: 'UZS', symbol: 'soʻm', name: 'Uzbekistani Som', rate: 12650, locked: true },
    { iso: 'SAR', symbol: 'SAR', name: 'Saudi Riyal', rate: 3.75, locked: true },
    { iso: 'QAR', symbol: 'QAR', name: 'Qatari Riyal', rate: 3.64, locked: true },
    { iso: 'KWD', symbol: 'KWD', name: 'Kuwaiti Dinar', rate: 0.307, locked: true },
  ];

  Demo.wholesaleTypes = [
    { id: 1, icon: '💵', nameEn: 'Cash', nameRu: 'Наличные', nameAdmin: 'Cash', appEn: 'Cash', appRu: 'Наличные' },
    { id: 15, icon: '💳', nameEn: 'Online', nameRu: 'Онлайн', nameAdmin: 'Online', appEn: 'Online', appRu: 'Онлайн' }
  ];

  Demo.percentOptions = [0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 4.25];
  Demo.qtyFilters = [1, 5, 20, 50, 100];
  Demo.timeRanges = [
    { name: '1M', value: 'one_month' }, { name: '3M', value: 'three_months' },
    { name: '6M', value: 'six_months' }, { name: '12M', value: 'one_year' }
  ];

  function product(id, code, brand, category, subcategory, chars, price, qty, supplierId, country, availableAt, status, modelCode) {
    var supplier = Demo.by(Demo.suppliers, 'id', supplierId);
    return {
      id: id, code: code, brand: brand, category: category, subcategory: subcategory,
      chars: chars, name: subcategory + ' ' + chars, model: modelCode,
      price: price, stockPrice: Math.round(price * 0.92), qty: qty,
      supplierId: supplierId, supplier: supplier ? supplier.name : '',
      country: country, availableAt: availableAt, status: status || 'Ready',
      visible: true
    };
  }

  Demo.products = [
    product(35897, 'MQ4T3 LL/A', 'Apple', 'iPhone', 'iPhone 18 Pro', '256Gb Black', 1234, 8, 433, 'UAE', '12.10.2026', 'Ready', 'A3520'),
    product(36140, 'MQ4T3 LL/A', 'Apple', 'iPhone', 'iPhone 18 Pro', '256Gb Black', 1284, 8, 434, 'UAE', '12.10.2026', 'Ready', 'A3520'),
    product(35864, 'MQ4T3 LL/A', 'Apple', 'iPhone', 'iPhone 18 Pro', '256Gb Black', 1302, 18, 435, 'UAE', '12.10.2026', 'Ready', 'A3520'),
    product(36450, 'MQ4T3 LL/A', 'Apple', 'iPhone', 'iPhone 18 Pro', '256Gb Black', 1234, 16, 436, 'UAE', '12.10.2026', 'Ready', 'A3520'),
    product(36451, 'MQ4T3 LL/A', 'Apple', 'iPhone', 'iPhone 18 Pro', '256Gb Burgundy', 1263, 38, 438, 'UAE', '12.10.2026', 'Ready', 'A3520'),
    product(35867, 'MQ4T3 LL/A', 'Apple', 'iPhone', 'iPhone 18 Pro', '256Gb Burgundy', 1304, 24, 439, 'UAE', '12.10.2026', 'Ready', 'A3520'),
    product(36142, 'MQ4T3 LL/A', 'Apple', 'iPhone', 'iPhone 18 Pro', '256Gb Silver', 1292, 1, 433, 'UAE', '12.10.2026', 'Ready', 'A3520'),
    product(36452, 'MQ4T3 LL/A', 'Apple', 'iPhone', 'iPhone 18 Pro', '256Gb Silver', 1174, 58, 436, 'UAE', '12.10.2026', 'Ready', 'A3520'),
    product(36501, 'MQ5A1 LL/A', 'Apple', 'iPhone', 'iPhone 18 Pro Max', '512Gb Black', 1479, 12, 433, 'UAE', '15.10.2026', 'Ready', 'A3521'),
    product(36502, 'MQ5A1 LL/A', 'Apple', 'iPhone', 'iPhone 18 Pro Max', '512Gb Desert', 1499, 21, 440, 'UAE', '15.10.2026', 'Ready', 'A3521'),
    product(36510, 'MQ5A2 LL/A', 'Apple', 'iPhone', 'iPhone 18 Pro Max', '1Tb Black', 1710, 6, 434, 'UAE', '18.10.2026', 'Pre-order', 'A3521'),
    product(34820, 'MPX3 LL/A', 'Apple', 'iPhone', 'iPhone 17 Pro', '256Gb Blue', 1080, 34, 433, 'UAE', '10.10.2026', 'Ready', 'A3310'),
    product(34821, 'MPX3 LL/A', 'Apple', 'iPhone', 'iPhone 17 Pro', '512Gb Orange', 1125, 19, 435, 'UAE', '10.10.2026', 'Ready', 'A3310'),
    product(33010, 'MT2A LL/A', 'Apple', 'iPad', 'iPad Pro 13 M5', '256Gb Space Black', 1490, 9, 436, 'UAE', '20.10.2026', 'Ready', 'A3010'),
    product(33011, 'MT2A LL/A', 'Apple', 'iPad', 'iPad Air 11', '128Gb Blue', 620, 22, 438, 'UAE', '20.10.2026', 'Ready', 'A3011'),
    product(34012, 'MR4B LL/A', 'Apple', 'MacBook', 'MacBook Pro 14 M5', '512Gb Silver', 2140, 7, 433, 'UAE', '22.10.2026', 'Pre-order', 'A2914'),
    product(35013, 'MQA7 LL/A', 'Apple', 'Apple Watch', 'Watch Ultra 3', '49mm Natural', 890, 15, 440, 'UAE', '18.10.2026', 'Ready', 'A3100'),
    product(35114, 'MQH4 LL/A', 'Apple', 'AirPods', 'AirPods Pro 3', 'White', 244, 60, 439, 'UAE', '11.10.2026', 'Ready', 'A3120'),
    product(37001, 'SM-S948B', 'Samsung', 'Galaxy S', 'Galaxy S26 Ultra', '512Gb Titanium', 1180, 25, 434, 'UAE', '14.10.2026', 'Ready', 'SM-S948'),
    product(37002, 'SM-S948B', 'Samsung', 'Galaxy S', 'Galaxy S26 Ultra', '256Gb Black', 1090, 31, 435, 'UAE', '14.10.2026', 'Ready', 'SM-S948'),
    product(37003, 'SM-S947B', 'Samsung', 'Galaxy S', 'Galaxy S26+', '256Gb Silver', 930, 18, 438, 'UAE', '14.10.2026', 'Ready', 'SM-S947'),
    product(37101, 'SM-F966B', 'Samsung', 'Galaxy Z', 'Galaxy Z Fold 8', '512Gb Blue', 1980, 5, 433, 'UAE', '25.10.2026', 'Pre-order', 'SM-F966'),
    product(37102, 'SM-F766B', 'Samsung', 'Galaxy Z', 'Galaxy Z Flip 8', '256Gb Green', 1120, 11, 440, 'UAE', '25.10.2026', 'Pre-order', 'SM-F766'),
    product(37201, '2312DRA50G', 'Xiaomi', 'Redmi', 'Redmi Note 15 Pro', '256Gb Black', 268, 120, 439, 'UAE', '12.10.2026', 'Ready', '2312DRA'),
    product(37202, '2312DRA50G', 'Xiaomi', 'Poco', 'Poco X8 Pro', '256Gb Yellow', 315, 84, 437, 'UAE', '12.10.2026', 'Ready', '2312DPX'),
    product(37301, 'GZP7X', 'Google', 'Pixel', 'Pixel 11 Pro', '256Gb Obsidian', 1090, 14, 436, 'UAE', '16.10.2026', 'Ready', 'GZP7X'),
    product(37401, 'CPH2581', 'OnePlus', 'OnePlus', 'OnePlus 15', '512Gb Green', 870, 16, 433, 'UAE', '17.10.2026', 'Ready', 'CPH2581'),
    product(37501, 'HON-M9P', 'Honor', 'Honor', 'Honor Magic 9 Pro', '512Gb Black', 950, 10, 440, 'UAE', '21.10.2026', 'Pre-order', 'HON-M9P'),
    product(37601, 'META-Q4', 'Meta', 'Meta Quest', 'Quest 4', '128Gb White', 640, 13, 438, 'UAE', '28.10.2026', 'Pre-order', 'META-Q4'),
    product(37701, 'WH-60', 'Whoop', 'Whoop', 'Whoop 6.0', 'One size Black', 239, 45, 439, 'UAE', '19.10.2026', 'Ready', 'WH-60'),
    product(37801, 'DJI-OP4', 'DJI', 'Osmo', 'Osmo Pocket 4', 'Standard', 720, 12, 435, 'UAE', '30.10.2026', 'Pre-order', 'DJI-OP4')
  ];

  Demo.productName = function (p) {
    return p.name.indexOf(p.brand) === 0 ? p.name : p.brand + ' ' + p.name;
  };

  /* ---------- orders ---------- */
  function pad(n, w) { var s = '' + n; while (s.length < (w || 5)) s = '0' + s; return s; }

  Demo.orders = { purchases: [], sales: [], deliveries: [], issued: [], penalties: [] };

  var purchaseStatusRange = [0, 1, 2, 3, 4, 5];
  for (var i = 0; i < 14; i++) {
    var supplier = Demo.suppliers[i % Demo.suppliers.length];
    var prod = Demo.products[(i * 3) % Demo.products.length];
    var st = Demo.statuses[purchaseStatusRange[i % purchaseStatusRange.length]];
    Demo.orders.purchases.push({
      id: pad(10421 + i), date: Demo.date(2026, 11, 2 + (i % 17)), supplierId: supplier.id,
      supplier: supplier.name, country: supplier.country, product: prod.name, brand: prod.brand,
      qty: 5 + (i * 7) % 40, price: prod.stockPrice, total: prod.stockPrice * (5 + (i * 7) % 40),
      status: st.ru, statusColor: st.color, packings: 1 + i % 3, imei: 5 + (i * 7) % 40,
      eta: Demo.date(2026, 11, 6 + (i % 14))
    });
  }

  for (var j = 0; j < 16; j++) {
    var customer = Demo.customers[j % Demo.customers.length];
    var product = Demo.products[(j * 5) % Demo.products.length];
    var st2 = Demo.statuses[(j + 2) % Demo.statuses.length];
    var qty = 2 + (j * 6) % 30;
    Demo.orders.sales.push({
      id: pad(78410 + j), date: Demo.date(2026, 11, 1 + (j % 19)), customerId: customer.id,
      customer: customer.name, country: customer.country, product: product.name, brand: product.brand,
      model: product.model, qty: qty, price: product.price, total: product.price * qty,
      status: st2.ru, statusColor: st2.color, logistics: customer.logistics,
      statusId: st2.id, packings: 1 + j % 3, imei: qty
    });
  }

  for (var k = 0; k < 10; k++) {
    var sale = Demo.orders.sales[k];
    Demo.orders.deliveries.push({
      id: pad(55210 + k), order: sale.id, side: k % 2 ? 'client' : 'supplier',
      party: k % 2 ? sale.customer : Demo.suppliers[k % Demo.suppliers.length].name,
      country: sale.country, places: 1 + k % 3, qty: sale.qty,
      status: Demo.statuses[(k + 1) % Demo.statuses.length].ru,
      statusColor: Demo.statuses[(k + 1) % Demo.statuses.length].color,
      date: Demo.date(2026, 11, 3 + k), logistics: k % 2 ? sale.logistics : 'Aramex Gulf'
    });
  }

  for (var m = 0; m < 12; m++) {
    var sd = Demo.orders.sales[m];
    Demo.orders.issued.push({
      id: pad(44010 + m), order: sd.id, customer: sd.customer, country: sd.country,
      product: sd.product, qty: sd.qty, price: sd.price, total: sd.total,
      issuedAt: Demo.date(2026, 10, 3 + m), status: 'Выдан', serial: 'S' + (880000 + m * 137)
    });
  }

  for (var q = 0; q < 9; q++) {
    var reason = Demo.reasons[q % Demo.reasons.length];
    var side = q % 3 === 0 ? 'Supplier' : (q % 3 === 1 ? 'Client' : 'Country');
    var party = side === 'Supplier' ? Demo.suppliers[q % 8].name : (side === 'Client' ? Demo.customers[q % 8].name : Demo.countries[q % 6].name);
    Demo.orders.penalties.push({
      id: pad(9100 + q), order: Demo.orders.sales[q % 12].id, side: side, party: party,
      reason: reason.name, amount: reason.fine * (1 + q % 3), paid: q % 4 === 0,
      date: Demo.date(2026, 10, 20 + q), country: Demo.countries[q % 6].name
    });
  }

  Demo.p2p = [];
  for (var b = 0; b < 9; b++) {
    var bp = Demo.products[(b * 4) % Demo.products.length];
    var bq = [5, 10, 20, 40, 60][b % 5];
    Demo.p2p.push({
      id: 16530 + b, product: bp.name, brand: bp.brand, qty: bq,
      bid: Math.round(bp.price * (0.97 + (b % 5) * 0.012)), best: Math.round(bp.price * (0.95 + (b % 4) * 0.01)),
      ends: Demo.date(2026, 11, 21 + (b % 7)), status: b % 4 === 0 ? 'Approved' : (b % 4 === 1 ? 'Completed' : 'Active'),
      supplier: Demo.suppliers[b % 8].name, country: Demo.countries[b % 6].name, side: 'purchase'
    });
  }

  Demo.chats = [
    {
      id: 161476, name: 'Rashid Al Mansoori', company: 'Gulf Mobile Retail LLC', country: 'UAE', unread: 2,
      last: 'Please add 2 more cases to the order', lastAt: '10:42',
      messages: [
        { from: 'them', text: 'Hi! Any update on order #78410?', at: '09:58' },
        { from: 'me', text: 'Good morning. The order is assembled, waiting for departure on 21.11.', at: '10:03' },
        { from: 'them', text: 'Perfect. Will the IMEI list be in the packing list?', at: '10:30' },
        { from: 'me', text: 'Yes, all serials are attached to the packing list document.', at: '10:31' },
        { from: 'them', text: 'Please add 2 more cases to the order', at: '10:42' }
      ]
    },
    {
      id: 161477, name: 'Aigerim Suleimenova', company: 'Skyline Trading', country: 'Kazakhstan', unread: 0,
      last: 'Спасибо, оплату получили', lastAt: 'Вчера',
      messages: [
        { from: 'me', text: 'Добрый день! Счёт по заказу #78412 отправлен на почту.', at: '14:10' },
        { from: 'them', text: 'Спасибо, оплату получили', at: '14:40' }
      ]
    },
    {
      id: 161478, name: 'Fatima Khalid', company: 'Emirates Phone Store', country: 'UAE', unread: 1,
      last: 'Can we change the logistic to Emirates Post?', lastAt: 'Вчера',
      messages: [
        { from: 'them', text: 'Can we change the logistic to Emirates Post?', at: '16:22' }
      ]
    },
    {
      id: 161479, name: 'Dilshod Rakhimov', company: 'Tashkent Mobile Hub', country: 'Uzbekistan', unread: 0,
      last: 'When will the license be renewed?', lastAt: '18 ноя',
      messages: [
        { from: 'them', text: 'When will the license be renewed?', at: '11:05' },
        { from: 'me', text: 'License is active till 05.05.2027, no action needed.', at: '11:20' }
      ]
    },
    {
      id: 161480, name: 'Support · Fimex', company: 'Fimex', country: 'UAE', unread: 0,
      last: 'Ticket #4412 closed', lastAt: '17 ноя',
      messages: [
        { from: 'them', text: 'Your ticket #4412 (P2P bid) has been resolved.', at: '09:00' }
      ]
    }
  ];

  Demo.notifications = [
    { id: 1, title: 'Заказ #78410 собран', body: 'Позиция iPhone 18 Pro 256Gb Black готова к отправке.', at: '10:20', unread: true, kind: 'order' },
    { id: 2, title: 'P2P-ставка одобрена', body: 'Поставщик принял ставку на 20 × iPhone 17 Pro.', at: '09:15', unread: true, kind: 'p2p' },
    { id: 3, title: 'Лицензия компании', body: 'License expires in 30 days — update documents.', at: 'Вчера', unread: false, kind: 'license' },
    { id: 4, title: 'Новые позиции в прайс-листе', body: 'Samsung Galaxy S26 Ultra доступен к заказу.', at: '18 ноя', unread: false, kind: 'catalog' },
    { id: 5, title: 'Напоминание об оплате', body: 'Balance по заказу #78412 — $1 450.', at: '17 ноя', unread: false, kind: 'payment' }
  ];

  Demo.stats = {
    months: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    revenue: [412, 388, 445, 502, 476, 530, 588, 561, 610, 648, 702, 731],
    orders: [18, 16, 21, 24, 22, 26, 29, 27, 31, 33, 36, 38],
    byBrand: [
      { name: 'Apple', value: 62, color: '#1a1a1a' },
      { name: 'Samsung', value: 18, color: '#1428a0' },
      { name: 'Xiaomi', value: 9, color: '#ff6900' },
      { name: 'Google', value: 5, color: '#4285f4' },
      { name: 'Other', value: 6, color: '#c1c6d0' }
    ],
    byCountry: [
      { name: 'UAE', value: 46 }, { name: 'Kazakhstan', value: 21 }, { name: 'Uzbekistan', value: 14 },
      { name: 'Saudi Arabia', value: 10 }, { name: 'Qatar', value: 6 }, { name: 'Kuwait', value: 3 }
    ],
    topSuppliers: [
      { name: 'NOVA DISTRIBUTION FZCO', value: 32 }, { name: 'ORBIT SUPPLY FZCO', value: 24 },
      { name: 'CELLPORT TRADING LLC', value: 17 }, { name: 'SAHARA GADGETS LLC', value: 12 },
      { name: 'ATLAS DEVICES FZCO', value: 9 }
    ],
    p2p: [
      { name: 'NOVA DISTRIBUTION FZCO', bids: 42, approved: 31 },
      { name: 'ORBIT SUPPLY FZCO', bids: 28, approved: 19 },
      { name: 'TECHVISION IMPEX', bids: 21, approved: 12 },
      { name: 'MERIDIAN TECH FZE', bids: 14, approved: 9 }
    ]
  };

  Demo.constants = [
    { group: 'Auth', key: 'fi_company_license_expired_title', ru: 'Срок лицензии вашей компании истек', en: 'Your company license has expired', screen: 'Paywall' },
    { group: 'Auth', key: 'fi_login_button_title', ru: 'Войти', en: 'Sign in', screen: 'Login' },
    { group: 'Cart', key: 'ma_cart_empty_title', ru: 'Корзина пуста', en: 'Your cart is empty', screen: 'Cart' },
    { group: 'Cart', key: 'ma_cart_checkout_title', ru: 'Оформить заказ', en: 'Checkout', screen: 'Cart' },
    { group: 'Orders', key: 'fi_order_detail_status_title', ru: 'Статус заказа', en: 'Order status', screen: 'OrderDetailViewController' },
    { group: 'Orders', key: 'ma_orders_empty_title', ru: 'Заказов пока нет', en: 'No orders yet', screen: 'Orders' },
    { group: 'P2P', key: 'fi_p2p_bid_button_title', ru: 'Предложить цену', en: 'Offer price', screen: 'P2P' },
    { group: 'Profile', key: 'ma_profile_logout_title', ru: 'Выйти', en: 'Log out', screen: 'Profile' },
    { group: 'Paywall', key: 'fi_paywall_monthly_title', ru: 'Месячная подписка', en: 'Fimex Monthly', screen: 'Subscription' },
    { group: 'Paywall', key: 'fi_paywall_yearly_title', ru: 'Годовая подписка', en: 'Fimex Yearly', screen: 'Subscription' }
  ];

  Demo.chars = [
    { name: 'Цвет', icon: '🎨', values: ['Black', 'Silver', 'Burgundy', 'Glacier', 'Blue', 'Titanium', 'Green'], type: 'Круговая', filter: true, required: true, title: true, price: true, info: true },
    { name: 'Память', icon: '💾', values: ['64Gb', '128Gb', '256Gb', '512Gb', '1Tb'], type: 'Линейная', filter: true, required: true, title: true, price: true, info: true },
    { name: 'Состояние', icon: '✨', values: ['New', 'Refurbished', 'Open box'], type: 'Круговая', filter: true, required: false, title: false, price: true, info: true },
    { name: 'Гарантия', icon: '🛡️', values: ['12 месяцев', '24 месяца', 'Без гарантии'], type: 'Линейная', filter: false, required: false, title: false, price: false, info: true },
    { name: 'Комплект', icon: '📦', values: ['Полный', 'Без зарядки', 'Только устройство'], type: 'Круговая', filter: false, required: false, title: false, price: false, info: false },
    { name: 'Страна', icon: '🌍', values: ['UAE', 'US', 'HK', 'JP', 'KR', 'AU'], type: 'Круговая', filter: true, required: true, title: false, price: false, info: false }
  ];

  Demo.iosPricelist = Demo.products.filter(function (p) { return p.category === 'iPhone'; }).map(function (p) {
    return {
      id: p.id, subcategory: p.subcategory, color: p.chars.split(' ').slice(1).join(' '),
      storage: p.chars.split(' ')[0], price: p.price, qty: p.qty,
      country: ['JP', 'US', 'HK', 'KR', 'AU'][p.id % 5], from: p.status === 'Ready' ? 'Ready' : 'Pre-order',
      availableAt: p.availableAt, highlight: p.id % 2 === 0
    };
  });

  Demo.ios = {
    brandCategories: {
      Apple: ['iPhone', 'iPad', 'MacBook', 'Apple Watch', 'AirPods'],
      Samsung: ['Galaxy S', 'Galaxy Z', 'Galaxy A'],
      Xiaomi: ['Redmi', 'Poco', 'Xiaomi'],
      Google: ['Pixel'],
      OnePlus: ['OnePlus'],
      Honor: ['Honor'],
      Meta: ['Meta Quest'],
      Whoop: ['Whoop'],
      DJI: ['Osmo']
    },
    popular: [
      { brand: 'Apple', name: 'iPhone 18 Pro', category: 'iPhone' },
      { brand: 'Apple', name: 'iPhone 18 Pro Max', category: 'iPhone' },
      { brand: 'Apple', name: 'iPhone 17 Pro', category: 'iPhone' },
      { brand: 'Samsung', name: 'Galaxy S26 Ultra', category: 'Galaxy S' },
      { brand: 'Google', name: 'Pixel 11 Pro', category: 'Pixel' },
      { brand: 'Xiaomi', name: 'Redmi Note 15 Pro', category: 'Redmi' }
    ]
  };

  window.Demo = Demo;
})();
