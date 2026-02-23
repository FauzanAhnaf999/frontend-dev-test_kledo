import { useState, useEffect } from 'react'

// Type definitions
interface Province {
  id: number
  name: string
}

interface Regency {
  id: number
  name: string
  province_id: number
}

interface District {
  id: number
  name: string
  regency_id: number
}

interface RegionsData {
  districts: District[]
  provinces: Province[]
  regencies: Regency[]
}

// Custom hook for loading regions data
const useRegions = () => {
  const [regions, setRegions] = useState<RegionsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('Fetching regions data...')
    fetch('/data/indonesia_regions.json')
      .then(response => response.json())
      .then(data => {
        console.log('Regions data received:', data)
        setRegions(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching regions data:', error)
        setLoading(false)
      })
  }, [])

  return { regions, loading }
}

// Filter component
const RegionFilter = ({ 
  regions, 
  onFilterChange, 
  onReset 
}: { 
  regions: RegionsData | null, 
  onFilterChange: (filters: { province: string, regency: string, district: string }) => void,
  onReset: () => void
}) => {
  console.log('RegionFilter rendered with regions:', regions);
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedRegency, setSelectedRegency] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')

  useEffect(() => {
    const savedProvince = localStorage.getItem('selectedProvince')
    const savedRegency = localStorage.getItem('selectedRegency')
    const savedDistrict = localStorage.getItem('selectedDistrict')

    if (savedProvince) {
      setSelectedProvince(savedProvince)
    }
    if (savedRegency) {
      setSelectedRegency(savedRegency)
    }
    if (savedDistrict) {
      setSelectedDistrict(savedDistrict)
    }
  }, [])

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = e.target.value
    setSelectedProvince(provinceId)
    setSelectedRegency('')
    setSelectedDistrict('')
    localStorage.setItem('selectedProvince', provinceId)
    localStorage.removeItem('selectedRegency')
    localStorage.removeItem('selectedDistrict')
    onFilterChange({ province: provinceId, regency: '', district: '' })
  }

  const handleRegencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const regencyId = e.target.value
    setSelectedRegency(regencyId)
    setSelectedDistrict('')
    localStorage.setItem('selectedRegency', regencyId)
    localStorage.removeItem('selectedDistrict')
    onFilterChange({ province: selectedProvince, regency: regencyId, district: '' })
  }

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = e.target.value
    setSelectedDistrict(districtId)
    localStorage.setItem('selectedDistrict', districtId)
    onFilterChange({ province: selectedProvince, regency: selectedRegency, district: districtId })
  }

  const handleReset = () => {
    setSelectedProvince('')
    setSelectedRegency('')
    setSelectedDistrict('')
    localStorage.removeItem('selectedProvince')
    localStorage.removeItem('selectedRegency')
    localStorage.removeItem('selectedDistrict')
    onReset()
  }

  const filteredRegencies = regions?.regencies?.filter(
    (regency) => selectedProvince === '' || regency.province_id === parseInt(selectedProvince)
  ) || []

  const filteredDistricts = regions?.districts?.filter(
    (district) => selectedRegency === '' || district.regency_id === parseInt(selectedRegency)
  ) || []

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Filter Wilayah</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Provinsi</label>
          <div className="relative">
            <select
              name="province"
              value={selectedProvince}
              onChange={handleProvinceChange}
              className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke-width=%271.5%27 stroke=%27%236b7280%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 d=%27M19.5 8.25l-7.5 7.5-7.5-7.5%27 /%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1.25em 1.25em'
              }}
            >
              <option value="">Pilih Provinsi</option>
              {regions?.provinces?.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Kota/Kabupaten</label>
          <div className="relative">
            <select
              name="regency"
              value={selectedRegency}
              onChange={handleRegencyChange}
              disabled={!selectedProvince}
              className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed appearance-none bg-white"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke-width=%271.5%27 stroke=%27%236b7280%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 d=%27M19.5 8.25l-7.5 7.5-7.5-7.5%27 /%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1.25em 1.25em'
              }}
            >
              <option value="">Pilih Kota/Kabupaten</option>
              {filteredRegencies.map((regency) => (
                <option key={regency.id} value={regency.id}>
                  {regency.name}
                </option>
              ))}
            </select>
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Kecamatan</label>
          <div className="relative">
            <select
              name="district"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!selectedRegency}
              className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed appearance-none bg-white"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke-width=%271.5%27 stroke=%27%236b7280%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 d=%27M19.5 8.25l-7.5 7.5-7.5-7.5%27 /%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1.25em 1.25em'
              }}
            >
              <option value="">Pilih Kecamatan</option>
              {filteredDistricts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 border border-blue-200 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors duration-200 text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Reset
        </button>
      </div>
    </div>
  )
}

// Breadcrumb component
const Breadcrumb = ({ 
  regions, 
  selectedProvince, 
  selectedRegency, 
  selectedDistrict 
}: { 
  regions: RegionsData | null, 
  selectedProvince: string, 
  selectedRegency: string, 
  selectedDistrict: string 
}) => {
  const breadcrumbItems: Array<{ name: string; id: number | null }> = [
    { name: 'Indonesia', id: null },
  ]

  if (selectedProvince) {
    const province = regions?.provinces?.find(p => p.id === parseInt(selectedProvince))
    if (province) {
      breadcrumbItems.push({ name: province.name, id: province.id })
    }
  }

  if (selectedRegency) {
    const regency = regions?.regencies?.find(r => r.id === parseInt(selectedRegency))
    if (regency) {
      breadcrumbItems.push({ name: regency.name, id: regency.id })
    }
  }

  if (selectedDistrict) {
    const district = regions?.districts?.find(d => d.id === parseInt(selectedDistrict))
    if (district) {
      breadcrumbItems.push({ name: district.name, id: district.id })
    }
  }

  return (
    <nav className="breadcrumb flex items-center space-x-2 text-sm text-gray-500 border-b border-gray-200 py-3 px-4">
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <span className="text-gray-300 mx-1">›</span>}
          <span className={index === breadcrumbItems.length - 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
            {item.name}
          </span>
        </div>
      ))}
    </nav>
  )
}

// Content display component
const RegionContent = ({ 
  regions, 
  selectedProvince, 
  selectedRegency, 
  selectedDistrict 
}: { 
  regions: RegionsData | null, 
  selectedProvince: string, 
  selectedRegency: string, 
  selectedDistrict: string 
}) => {
  const province = selectedProvince 
    ? regions?.provinces?.find(p => p.id === parseInt(selectedProvince)) 
    : null

  const regency = selectedRegency 
    ? regions?.regencies?.find(r => r.id === parseInt(selectedRegency)) 
    : null

  const district = selectedDistrict 
    ? regions?.districts?.find(d => d.id === parseInt(selectedDistrict)) 
    : null

  return (
    <main className="flex-1">
      <div className="space-y-6">
        {province && (
          <div className="text-center">
            <div className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-3">
              Provinsi
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">{province.name}</h1>
            {regency && (
              <div className="flex justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            )}
          </div>
        )}

        {regency && (
          <div className="text-center">
            <div className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-3">
              Kota / Kabupaten
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">{regency.name}</h2>
            {district && (
              <div className="flex justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            )}
          </div>
        )}

        {district && (
          <div className="text-center">
            <div className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-3">
              Kecamatan
            </div>
            <h3 className="text-5xl font-bold text-gray-900 mb-6">{district.name}</h3>
          </div>
        )}

        {!province && !regency && !district && (
          <div className="text-center py-16">
            <div className="text-6xl text-gray-200 mb-4">📍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Pilih Wilayah Anda</h2>
            <p className="text-gray-600">Mulai dengan memilih provinsi dari panel filter sebelah kiri</p>
          </div>
        )}
      </div>
    </main>
  )
}

// Main FilterPage component
export default function FilterPage() {
  const { regions, loading } = useRegions()
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedRegency, setSelectedRegency] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')

  useEffect(() => {
    const savedProvince = localStorage.getItem('selectedProvince')
    const savedRegency = localStorage.getItem('selectedRegency')
    const savedDistrict = localStorage.getItem('selectedDistrict')

    if (savedProvince) {
      setSelectedProvince(savedProvince)
    }
    if (savedRegency) {
      setSelectedRegency(savedRegency)
    }
    if (savedDistrict) {
      setSelectedDistrict(savedDistrict)
    }
  }, [])

  const handleFilterChange = ({ province, regency, district }: { province: string, regency: string, district: string }) => {
    setSelectedProvince(province)
    setSelectedRegency(regency)
    setSelectedDistrict(district)
  }

  const handleReset = () => {
    setSelectedProvince('')
    setSelectedRegency('')
    setSelectedDistrict('')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-72 bg-white flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <span className="font-semibold text-gray-900">Frontend Assessment</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <RegionFilter
            regions={regions}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <Breadcrumb
          regions={regions}
          selectedProvince={selectedProvince}
          selectedRegency={selectedRegency}
          selectedDistrict={selectedDistrict}
        />
        
        <div className="flex-1 p-8">
          <RegionContent
            regions={regions}
            selectedProvince={selectedProvince}
            selectedRegency={selectedRegency}
            selectedDistrict={selectedDistrict}
          />
        </div>
      </div>
    </div>
  )
}
