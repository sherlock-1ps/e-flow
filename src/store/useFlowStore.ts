import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Flow = {
  name: string
  version: string | number
  newVersion: string | number
  versionId: string | number
  isContinue: boolean
  flow: {
    nodeDataArray: any[]
    linkDataArray: any[]
  }
}

type FlowState = {
  flow: Flow
  selectedField: any
  setSelectedField: (field: any) => void
  clearSelectedField: () => void

  createFlow: (name: string, version: string) => void
  updateFlowInfo: (info: Partial<Pick<Flow, 'name' | 'version'>>) => void
  setFullFlow: (payload: any) => void

  myDiagram: any
  setMyDiagram: (diagram: any) => void

  updateFlowNodeText: (key: string, newText: string) => void
  updateFlowLinkText: (linkKey: string, newText: string) => void

  setNodeDataArray: (nodes: any[]) => void
  setLinkDataArray: (links: any[]) => void
}

export const useFlowStore = create<FlowState>()(
  persist(
    (set, get) => ({
      flow: {
        name: '',
        version: '',
        newVersion: '',
        versionId: '',
        isContinue: false,
        flow: {
          nodeDataArray: [],
          linkDataArray: []
        }
      },

      selectedField: null,
      setSelectedField: (field) => set({ selectedField: field }),
      clearSelectedField: () => set({ selectedField: null }),

      myDiagram: null,
      setMyDiagram: (diagram) => set({ myDiagram: diagram }),

      createFlow: (name, version) =>
        set(() => ({
          flow: {
            name,
            version,
            newVersion: '',
            versionId: '',
            isContinue: false,
            flow: {
              nodeDataArray: [],
              linkDataArray: []
            }
          }
        })),

      updateFlowInfo: (info) =>
        set((state) => ({
          flow: {
            ...state.flow,
            ...info
          }
        })),

      setFullFlow: (payload) =>
        set((state) => ({
          flow: {
            name: payload.name ?? state.flow.name,
            version: payload.version ?? state.flow.version,
            newVersion: payload.newVersion ?? state.flow.newVersion,
            versionId: payload.versionId ?? state.flow.versionId,
            isContinue: payload.isContinue ?? state.flow.isContinue,
            flow: payload.flow ?? {}
          }
        })),

      setNodeDataArray: (nodes) =>
        set((state) => ({
          flow: {
            ...state.flow,
            flow: {
              ...state.flow.flow,
              nodeDataArray: nodes
            }
          }
        })),

      setLinkDataArray: (links) =>
        set((state) => ({
          flow: {
            ...state.flow,
            flow: {
              ...state.flow.flow,
              linkDataArray: links
            }
          }
        })),

      updateFlowNodeText: (key, newText) =>
        set((state) => ({
          flow: {
            ...state.flow,
            flow: {
              ...state.flow.flow,
              nodeDataArray: state.flow.flow.nodeDataArray.map((node) =>
                node.key === key ? { ...node, text: newText } : node
              )
            }
          }
        })),

      updateFlowLinkText: (key, newText) =>
        set((state) => ({
          flow: {
            ...state.flow,
            flow: {
              ...state.flow.flow,
              linkDataArray: state.flow.flow.linkDataArray.map((link) =>
                link.key === key ? { ...link, text: newText } : link
              )
            }
          }
        }))
    }),
    {
      name: 'flow-storage',
      partialize: (state) => ({
        flow: state.flow
      })
    }
  )
)
