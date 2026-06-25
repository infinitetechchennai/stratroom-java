import { useCallback, useEffect, useState } from 'react'

import { getRiskDashboardData, getRiskDashboardDepartments } from '../api/riskDashboardApi'

import { transformRiskDashboard } from '../pages/risk/riskDashboardUtils'



const EMPTY_VIEW = transformRiskDashboard({

  totalRisk: 0,

  totalTreatment: 0,

  totalMonitoring: 0,

  totalPlan: 0,

  riskDTO: [],

  categoryCount: {},

  statusCount: {},

  treatmentSrategyCount: {},

  likelihoodCount: {}

})



export function useRiskDashboardData() {

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState(null)

  const [departments, setDepartments] = useState([])

  const [selectedDeptId, setSelectedDeptId] = useState('')

  const [dashboard, setDashboard] = useState(EMPTY_VIEW)



  const loadDashboard = useCallback(async (deptId) => {

    if (!deptId) {

      setDashboard(EMPTY_VIEW)

      return

    }

    try {

      const data = await getRiskDashboardData(deptId)

      setDashboard(transformRiskDashboard(data))

      setError(null)

    } catch (err) {

      setError(err?.message || 'Failed to load risk dashboard')

      setDashboard(EMPTY_VIEW)

    }

  }, [])



  useEffect(() => {

    let cancelled = false



    async function init() {

      setLoading(true)

      try {

        const depts = await getRiskDashboardDepartments()

        if (cancelled) return

        setDepartments(depts)



        const firstId = depts[0]?.id != null ? String(depts[0].id) : ''

        setSelectedDeptId(firstId)



        if (firstId) {

          const data = await getRiskDashboardData(firstId)

          if (!cancelled) {

            setDashboard(transformRiskDashboard(data))

            setError(null)

          }

        } else {

          setDashboard(EMPTY_VIEW)

          setError(
            'No departments available. Import Organisation + Users, then log out and log in again so your profile has an organisation.'
          )

        }

      } catch (err) {

        if (!cancelled) {

          setError(err?.message || 'Failed to load departments')

          setDashboard(EMPTY_VIEW)

        }

      } finally {

        if (!cancelled) setLoading(false)

      }

    }



    init()

    return () => { cancelled = true }

  }, [])



  const onDeptChange = useCallback(async (deptId) => {

    setSelectedDeptId(deptId)

    setLoading(true)

    await loadDashboard(deptId)

    setLoading(false)

  }, [loadDashboard])



  return {

    loading,

    error,

    departments,

    selectedDeptId,

    dashboard,

    onDeptChange

  }

}


