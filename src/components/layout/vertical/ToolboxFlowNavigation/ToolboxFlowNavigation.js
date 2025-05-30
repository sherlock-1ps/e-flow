'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

const ToolboxFlowNavigation = () => {
  const paletteRef = useRef(null)
  const [goReady, setGoReady] = useState(false)

  useEffect(() => {
    if (!goReady || !paletteRef.current || !window.go) return

    const go = window.go
    const $ = go.GraphObject.make

    // Utility Functions
    function makePort(name, spot, option) {
      return $(go.Shape, 'Circle', {
        fill: null,
        stroke: null,
        desiredSize: new go.Size(15, 15),
        alignment: spot,
        alignmentFocus: spot,
        portId: name,
        fromSpot: spot,
        toSpot: spot,
        fromLinkable: true,
        toLinkable: true,
        fromLinkableDuplicates: true,
        toLinkableDuplicates: true,
        fromLinkableSelfNode: true,
        toLinkableSelfNode: true,
        cursor: 'pointer',
        ...option
      })
    }

    function jsonParse(data) {
      return JSON.parse(data)
    }

    const imgDisplay = $(go.Panel, go.Panel.Table, {
      background: 'transparent',
      cursor: 'Pointer',
      column: 0,
      height: 18,
      alignment: go.Spot.TopLeft
    }).add(
      $(go.Panel, go.Panel.Horizontal).add(
        $(go.Picture, {
          alignment: go.Spot.TopLeft,
          name: 'PICTURE',
          source: './images/3.png',
          desiredSize: new go.Size(18, 18)
        })
      )
    )

    const nodeSelectionAdornmentTemplate = $(go.Adornment, 'Auto').add(
      $(go.Shape, {
        fill: null,
        stroke: 'deepskyblue',
        strokeWidth: 1.5,
        strokeDashArray: [4, 2]
      }),
      $(go.Placeholder)
    )

    const nodeResizeAdornmentTemplate = $(go.Adornment, 'Spot', {
      locationSpot: go.Spot.Right
    }).add(
      $(go.Placeholder),
      ...[
        go.Spot.TopLeft,
        go.Spot.Top,
        go.Spot.TopRight,
        go.Spot.Left,
        go.Spot.Right,
        go.Spot.BottomLeft,
        go.Spot.Bottom,
        go.Spot.BottomRight
      ].map(spot =>
        $(go.Shape, {
          alignment: spot,
          cursor: `${spot.direction}-resize`,
          desiredSize: new go.Size(6, 6),
          fill: 'lightblue',
          stroke: 'deepskyblue'
        })
      )
    )

    const nodeRotateAdornmentTemplate = $(go.Adornment, {
      locationSpot: go.Spot.Center,
      locationObjectName: 'ELLIPSE'
    }).add(
      $(go.Shape, 'Ellipse', {
        name: 'ELLIPSE',
        cursor: 'pointer',
        desiredSize: new go.Size(7, 7),
        fill: 'lightblue',
        stroke: 'deepskyblue'
      }),
      $(go.Shape, {
        geometryString: 'M3.5 7 L3.5 30',
        isGeometryPositioned: true,
        stroke: 'deepskyblue',
        strokeWidth: 1.5,
        strokeDashArray: [4, 2]
      })
    )

    const nodeTemplatePanel = (option, isEdit = true) =>
      $(go.Node, 'Spot', {
        locationSpot: go.Spot.Center,
        selectable: true,
        resizeObjectName: 'PANEL',
        selectionAdornmentTemplate: nodeSelectionAdornmentTemplate,
        resizeAdornmentTemplate: nodeResizeAdornmentTemplate,
        rotateAdornmentTemplate: nodeRotateAdornmentTemplate,
        mouseEnter: (e, node) => showSmallPorts(node, true),
        mouseLeave: (e, node) => showSmallPorts(node, false)
      })
        .bindTwoWay('location', 'location', go.Point.parse, go.Point.stringify)
        .bindTwoWay('angle')
        .add(
          $(go.Panel, 'Auto', { name: 'PANEL' })
            .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)
            .add(
              $(go.Shape, 'Rectangle', {
                portId: '',
                cursor: 'pointer',
                fill: 'white',
                strokeWidth: 2
              })
                .bind('figure')
                .bind('fill'),
              $(go.TextBlock, {
                font: 'bold 10pt Helvetica, Arial, sans-serif',
                margin: 8,
                maxSize: new go.Size(160, NaN),
                wrap: go.Wrap.Fit,
                editable: isEdit
              }).bindTwoWay('text')
            ),
          makePort('T', go.Spot.Top, option),
          makePort('L', go.Spot.Left, option),
          makePort('R', go.Spot.Right, option),
          makePort('B', go.Spot.Bottom, option)
        )

    const nodeTemplatePanelActivity = (option, isEdit = true) =>
      $(go.Node, 'Spot', {
        locationSpot: go.Spot.Center,
        alignment: go.Spot.TopLeft,
        selectable: true,
        resizeObjectName: 'PANEL',
        selectionAdornmentTemplate: nodeSelectionAdornmentTemplate,
        resizeAdornmentTemplate: nodeResizeAdornmentTemplate,
        rotateAdornmentTemplate: nodeRotateAdornmentTemplate,
        mouseEnter: (e, node) => showSmallPorts(node, true),
        mouseLeave: (e, node) => showSmallPorts(node, false)
      })
        .bindTwoWay('location', 'location', go.Point.parse, go.Point.stringify)
        .bindTwoWay('angle')
        .add(
          $(go.Panel, 'Auto', { name: 'PANEL' })
            .bindTwoWay('desiredSize', 'size', go.Size.parse, go.Size.stringify)
            .add(
              $(go.Shape, 'Rectangle', {
                portId: '',
                cursor: 'pointer',
                fill: 'white',
                strokeWidth: 2
              })
                .bind('figure')
                .bind('fill'),
              $(go.Panel, 'Vertical', {
                padding: 8,
                defaultAlignment: go.Spot.Center
              }).add(
                $(go.TextBlock, {
                  name: 'TEXT',
                  editable: true,
                  font: 'bold 14px sans-serif',
                  width: 120,
                  wrap: go.TextBlock.None,
                  isMultiline: false,
                  stroke: 'black',
                  textAlign: 'center',
                  overflow: go.TextBlock.OverflowEllipsis,
                  textEdited: (tb, prev, curr) => {
                    console.log('Text changed:', curr)
                  }
                }).bindTwoWay('text'),
                $(go.Panel, 'Horizontal', {
                  itemTemplate: imgDisplay
                }).bind('itemArray', 'components', jsonParse)
              )
            ),
          makePort('T', go.Spot.Top, option),
          makePort('L', go.Spot.Left, option),
          makePort('R', go.Spot.Right, option),
          makePort('B', go.Spot.Bottom, option)
        )

    function showSmallPorts(node, show) {
      node.ports.each(port => {
        if (port.portId !== '') {
          port.fill = show ? 'rgba(0,0,0,.3)' : null
        }
      })
    }

    const nodeTemplateMap = new go.Map()
    nodeTemplateMap.add('start', nodeTemplatePanel({}, false))
    nodeTemplateMap.add('end', nodeTemplatePanel({}, false))
    nodeTemplateMap.add('comment', nodeTemplatePanel({}))
    nodeTemplateMap.add('condition', nodeTemplatePanel({}))
    nodeTemplateMap.add('activity', nodeTemplatePanelActivity({}))
    nodeTemplateMap.add('api', nodeTemplatePanelActivity({}))

    const myPalette = $(go.Palette, paletteRef.current, {
      maxSelectionCount: 1,
      nodeTemplateMap,
      model: new go.GraphLinksModel([
        { text: 'Start', figure: 'Ellipse', size: '75 75', fill: '#53D28C', category: 'start' },
        { text: 'Activity', figure: 'Rectangle', category: 'activity', components: JSON.stringify(['1', '2']) },
        { text: 'API', figure: 'Rectangle', category: 'api' },
        { text: 'Condition', figure: 'Diamond', fill: 'lightskyblue', category: 'condition' },
        { text: 'Comment', figure: 'RoundedRectangle', fill: 'lightyellow', category: 'comment' },
        { text: 'End', figure: 'Ellipse', size: '75 75', fill: '#CE0620', category: 'end' }
      ])
    })

    return () => {
      myPalette.div = null
    }
  }, [goReady])

  return (
    <>
      <Script src='/lib/go.js' strategy='lazyOnload' onLoad={() => setGoReady(true)} />
      <main className='bg-white flex flex-1 overflow-auto'>
        <div ref={paletteRef} className='border h-[500px] w-[200px]' />
      </main>
    </>
  )
}

export default ToolboxFlowNavigation
